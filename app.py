import os
from classifier import classify_image
from flask import Flask, request, redirect, url_for
from flask import jsonify
from flask_cors import CORS, cross_origin
from werkzeug import secure_filename

UPLOAD_FOLDER = '.'
ALLOWED_EXTENSIONS = set(['png','jpg','jpeg'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['CORS_HEADERS'] = 'Content-Type'

cors = CORS(app, resources={r"/": {"origins": "*"}})

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

@app.route("/", methods=['POST'])
@cross_origin()
def index():
    file = request.files['file']
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename).strip()
        print 'Saving file: ', filename, '...'
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        print 'classifying...'
        response = classify_image(filename)
        print response
        os.remove(filename)
        return jsonify(response)


        

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8001, debug=True)
