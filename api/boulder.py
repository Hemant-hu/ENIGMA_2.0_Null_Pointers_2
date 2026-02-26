from ultralytics import YOLO
import os
import cv2
import cvzone
from datetime import datetime

# Load YOLO model
model = YOLO("weights/best.pt")

def predict_boulder(image_path: str):
    """Predict boulders and save annotated image (supports png, jpg, jpeg)."""

    # Debug check (important)
    print("Loading image from:", image_path)
    print("File exists:", os.path.exists(image_path))

    # Read image
    image = cv2.imread(image_path)

    if image is None:
        print("❌ Error: Unsupported format or invalid path.")
        return

    # Run YOLO prediction
    results = model.predict(image)

    # Create output folder safely
    os.makedirs("results/boulders", exist_ok=True)

    # Draw detections
    for r in results:
        for box in r.boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            conf = float(box.conf[0])

            width = x2 - x1
            height = y2 - y1
            diameter = width * 0.3  # simple approximation

            cvzone.cornerRect(image, (x1, y1, width, height))
            # cvzone.putTextRect(
            #     image,
            #     f"Diameter: {diameter:.2f} | Conf: {conf:.2f}",
            #     (x1, max(35, y1))
            # )

    # Handle extension
    _, ext = os.path.splitext(image_path)
    ext = ext.lower()
    allowed_formats = [".png", ".jpg", ".jpeg"]

    if ext not in allowed_formats:
        print("⚠ Unsupported format. Saving as .jpg instead.")
        ext = ".jpg"

    # Save result
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    save_path = f"results/boulders/boulder_{timestamp}{ext}"
    cv2.imwrite(save_path, image)

    print(f"✅ Saved: {save_path}")


# 🚨 IMPORTANT: Use raw string OR forward slashes
predict_boulder(r"E:\ENIGMA_2.0_Null_Pointers_2\api\results\inputs\OIP.jpg")
# OR
# predict_boulder("E:/ENIGMA_2.0_Null_Pointers_2/api/results/inputs/OIP.jpg")