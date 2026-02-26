from ultralytics import YOLO
import os
import cv2
import cvzone
from datetime import datetime

# Load YOLO model
model = YOLO("weights/best.pt")

def predict_boulder(image_path: str):
    """Predict boulders and save annotated image (supports png, jpg, jpeg)."""

    print("Loading image from:", image_path)
    print("File exists:", os.path.exists(image_path))

    image = cv2.imread(image_path)

    if image is None:
        print("❌ Error: Unsupported format or invalid path.")
        return

    results = model.predict(image)

    os.makedirs("results/boulders", exist_ok=True)

    for r in results:
        for box in r.boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            conf = float(box.conf[0])

            width = x2 - x1
            height = y2 - y1
            diameter = width * 0.3

            # 🔥 THINNER BOX (main change)
            cvzone.cornerRect(
                image,
                (x1, y1, width, height),
                l=8,      # shorter corner lines
                t=1,      # thin corners
                rt=1      # thin rectangle border
            )

    _, ext = os.path.splitext(image_path)
    ext = ext.lower()
    allowed_formats = [".png", ".jpg", ".jpeg"]

    if ext not in allowed_formats:
        print("⚠ Unsupported format. Saving as .jpg instead.")
        ext = ".jpg"

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    save_path = f"results/boulders/boulder_{timestamp}{ext}"
    cv2.imwrite(save_path, image)

    print(f"✅ Saved: {save_path}")


predict_boulder(r"E:\ENIGMA_2.0_Null_Pointers_2\api\results\inputs\OIP.jpg")