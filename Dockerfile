FROM ubuntu
ADD . /code
WORKDIR /code
RUN apt-get update && apt-get -y upgrade
RUN apt-get install -y tesseract-ocr
RUN apt-get install -y tesseract-ocr-nep
RUN apt-get install -y python-pip
RUN pip install -r requirements.txt
#RUN wget https://github.com/tesseract-ocr/tessdata/raw/master/nep.traineddata
#run mv -v nep.traineddata /usr/local/share/tessdata/


CMD ["python", "app.py"]
