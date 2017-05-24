# Tensorflow Cloud Images Classifier
This is a project developed using 'Build a TensorFlow Image Classifier in 5 Min' [Youtube video](https://youtu.be/QfNvhPx5Px8), and this [Google CodeLab](https://codelabs.developers.google.com/codelabs/tensorflow-for-poets/?utm_campaign=chrome_series_machinelearning_063016&utm_source=gdev&utm_medium=yt-desc#0) as a guide.

Anyone can use this classifier to classify a cloud in Cumulus, Cumulonimbus or Cirrocumulos.

<a href="https://pt.wikipedia.org/wiki/Cumulus"><img src="http://girlinclouds.files.wordpress.com/2012/02/cumulus1.jpg" height="182"></a>
<a href="https://pt.wikipedia.org/wiki/Cumulonimbus"><img src="http://5berita.com/wp-content/uploads/2015/08/5-bentuk-awan-yang-dipercaya-memberikan-pertanda-buruk_berbentuk-ledakan-nuklir.jpg" height="182"></a>
<a href="https://pt.wikipedia.org/wiki/Cirrocumulus"><img src="http://4.bp.blogspot.com/-l3WivZkYin0/VLtAGu7RubI/AAAAAAAACTU/COFmDZ3DX9c/s1600/Cirroc%C3%BAmulos.jpg" height="182"></a>

## Requirements
* [Docker](https://www.docker.com/products/docker-toolbox)
* Python 2.7

## Usage
Clone this repo to ```${HOME}/tf_files/```

Start the docker image
```
docker run -it \
  --publish 6006:6006 \
  --volume ${HOME}/tf_files:/tf_files \
  --workdir /tf_files \
  tensorflow/tensorflow:1.1.0 bash
```
Then, run the classifier.py script to classify the image. 
```python classifier.py <path_to_file>```

It will display a list of the trained clouds labels with their matching score accuracy.
