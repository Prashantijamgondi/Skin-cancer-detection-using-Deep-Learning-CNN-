from fastapi import FastAPI, UploadFile, File
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
from tensorflow.keras.layers import TFSMLayer 
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import logging


logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)
app = FastAPI()

MODEL = TFSMLayer("../saved_models/11", call_endpoint="serving_default")
CLASS_NAMES = ["Basal Cell Carcinoma", 'Dermitofibroma', "Melanoma", "Normal", "Squamous Cell Carcinoma", "Unknown Cancer", ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def read_file_as_image(data) -> np.ndarray:
    try:
        image = np.array(Image.open(BytesIO(data)))
        return image
    except Exception as e:
        raise ValueError(f"Failed to process the file: {e}")

@app.get('/')
async def ping():
    return "Hello, world!"

@app.post('/predict')
async def predict(file: UploadFile = File(...)):
    try:
        logger.info("Received file for prediction")
        file_content = await file.read()
        image = read_file_as_image(file_content)

        image = tf.image.resize(image, (255, 255))
        image_batch = np.expand_dims(image, 0)  

        prediction = MODEL(image_batch)
        numpy_array = prediction["output_0"].numpy()
        index = np.argmax(numpy_array)
        predicted_class = CLASS_NAMES[index]
        confidence = np.max(numpy_array)
        
        logger.info(f"Prediction: {predicted_class}, Confidence: {confidence}")
        
        return JSONResponse(content={
            "prediction": predicted_class,
            "confidence": float(confidence),
            "confidence_percent": float(confidence * 100),
            "class_index": int(index)
        })

    except Exception as e:
        logger.error(f"Error during prediction: {e}")
        return JSONResponse(content={"error": str(e)}, status_code=500)

if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8001)