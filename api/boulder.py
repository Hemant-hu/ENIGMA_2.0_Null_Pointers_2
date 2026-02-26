from ultralytics import YOLO
import os
import cv2
import cvzone
import csv
from datetime import datetime

from geo.load_geometry import get_lat_lon
from geo.depth_estimator import pixel_to_meters, estimate_depth
from utils.tiling import split_image

model = YOLO("weights/best.pt")


def predict_boulder(image_path: str):

    image = cv2.imread(image_path)
    if image is None:
        print("Invalid path")
        return

    # 🔥 Split very large image into tiles
    tiles = split_image(image, tile_size=1024, overlap=200)

    os.makedirs("results/boulders", exist_ok=True)

    # New CSV file for measurements
    csv_path = "results/boulders/terrain_measurements.csv"
    csv_file = open(csv_path, mode='w', newline='')
    writer = csv.writer(csv_file)
    writer.writerow(["Latitude", "Longitude", "Diameter(m)", "Depth(m)", "Confidence"])

    # Loop over each tile
    for tile, offset_x, offset_y in tiles:

        results = model.predict(tile, verbose=False)

        for r in results:
            for box in r.boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                conf = float(box.conf[0])

                # Convert tile coords → original full image coords
                x1 += offset_x
                x2 += offset_x
                y1 += offset_y
                y2 += offset_y

                width_px = x2 - x1
                height_px = y2 - y1

                # Convert to real-world units
                diameter_m = pixel_to_meters(width_px)
                depth_m = estimate_depth(height_px * 0.5)

                # Center pixel for geo mapping
                cx = (x1 + x2) // 2
                cy = (y1 + y2) // 2

                lat, lon = get_lat_lon(cx, cy)

                # Save to CSV
                writer.writerow([lat, lon, diameter_m, depth_m, conf])

                # Draw bounding box on original image
                cvzone.cornerRect(image, (x1, y1, width_px, height_px), l=8, t=1, rt=1)

                # Text lines
                text1 = f"Lat:{lat:.4f} Lon:{lon:.4f}"
                text2 = f"D:{diameter_m:.2f}m Depth:{depth_m:.2f}m"

                # Draw text above box
                cvzone.putTextRect(
                    image,
                    text1,
                    (x1, max(30, y1 - 40)),
                    scale=0.7,
                    thickness=1
                )

                cvzone.putTextRect(
                    image,
                    text2,
                    (x1, max(60, y1 - 10)),
                    scale=0.7,
                    thickness=1
                )

    csv_file.close()

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    save_path = f"results/boulders/terrain_{timestamp}.jpg"
    cv2.imwrite(save_path, image)

    print("CSV Saved:", csv_path)
    print("Image Saved:", save_path)


# Run test
predict_boulder(r"results/inputs/ch2_ohr_ncp_20251109T1504259907_b_brw_d18.png")

