import cv2
import mediapipe as mp
import numpy as np

# =========================
# MediaPipe setup
# =========================
mp_face_detection = mp.solutions.face_detection
mp_drawing = mp.solutions.drawing_utils

# =========================
# Camera setup
# =========================
camera = cv2.VideoCapture(0)
camera.set(cv2.CAP_PROP_FRAME_WIDTH, 640)   # increase if your webcam supports
camera.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

def generate_frames():
    with mp_face_detection.FaceDetection(
        model_selection=0,        # 0 = short range, 1 = full range
        min_detection_confidence=0.4  # lower to catch more faces
    ) as face_detection:

        while True:
            success, frame = camera.read()
            if not success:
                continue  # retry instead of breaking

            # Convert to RGB for MediaPipe
            rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = face_detection.process(rgb)

            # Draw faces if detected
            if results.detections:
                for detection in results.detections:
                    bbox = detection.location_data.relative_bounding_box
                    h, w, _ = frame.shape

                    x1 = int(max(bbox.xmin * w, 0))
                    y1 = int(max(bbox.ymin * h, 0))
                    x2 = int(min((bbox.xmin + bbox.width) * w, w))
                    y2 = int(min((bbox.ymin + bbox.height) * h, h))

                    cv2.rectangle(frame, (x1, y1), (x2, y2),
                                  (0, 255, 0), 3)

                    cv2.putText(frame, "FACE", (x1, y1 - 10),
                                cv2.FONT_HERSHEY_SIMPLEX, 1.0,
                                (0, 255, 0), 2)

            # Encode frame as JPEG
            ret, buffer = cv2.imencode('.jpeg', frame)
            frame = buffer.tobytes()

            # Yield frame to Flask
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
