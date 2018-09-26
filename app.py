from flask import Flask, render_template, request, jsonify
from flask_uploads import UploadSet, configure_uploads, IMAGES
from PIL import Image, ExifTags
from bottle import route, app
import pytesseract
import urllib
import requests
import json
from flask_cors import CORS, cross_origin
from google.cloud import translate
import os




translate_client = translate.Client()

app = Flask(__name__,static_url_path='/static')
CORS(app, support_credentials=True)

photos = UploadSet('photos', IMAGES)
app.config['UPLOADED_PHOTOS_DEST'] = 'static/img'
configure_uploads(app, photos)


@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response


@app.route('/translate', methods=['GET', 'POST'])
@cross_origin(support_credentials=True)

def translate():
    return render_template('gt.html')


@app.route('/upload', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST' and 'photo' in request.files:
        filename = photos.save(request.files['photo'])
        fullpath = "static/img/" + filename
        image=Image.open(fullpath)
        for orientation in ExifTags.TAGS.keys():
            if ExifTags.TAGS[orientation]=='Orientation':
                    break
        
        #if image.format != 'png' and image.format != 'PNG':
        try:
            exif=dict(image._getexif().items())

            if exif[orientation] == 3:
                image=image.rotate(180, expand=True)
            elif exif[orientation] == 6:
                image=image.rotate(270, expand=True)
            elif exif[orientation] == 8:
                image=image.rotate(90, expand=True)

        except (AttributeError, KeyError, IndexError):
            print "Ops no exif"


        text = pytesseract.image_to_string(image, lang="nep").replace("\n"," ")  #Specify language to look after!
        sourceLang = "ne"
        targetLang =  "en"

        translation = translate_client.translate(text,target_language="eng")
        return jsonify({"nepali":text, "english": translation['translatedText']})
        
        #return render_template('gt.html',value=text)


@app.route('/', methods=['GET', 'POST'])
def landing():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True, port=8090, host="0.0.0.0")
