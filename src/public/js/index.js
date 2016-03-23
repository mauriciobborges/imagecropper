'use strict';

var $uploadCrop;

function readFile(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $uploadCrop.croppie('bind', {
        url: e.target.result
      });
    }
    reader.readAsDataURL(input.files[0]);
  }
  else {
    swal("Sorry - you're browser doesn't support the FileReader API");
  }
};

$uploadCrop = $('#cropper').croppie({
  viewport: {
    width: 200,
    height: 200,
    type: 'circle'
  },
  boundary: {
    width: 300,
    height: 300
  },
  exif: true
});

$('#image').on('change', function () {
  readFile(this);
});
$('#download').on('click', function (ev) {
  $uploadCrop.croppie('result', {
    type: 'canvas',
    size: 'viewport'
  }).then(function (resp) {
    var dl = document.createElement('a');
    dl.setAttribute('href', resp);
    dl.setAttribute('download', 'ibagem.jpg');
    dl.click();
  });
});
/*
$('#image').change(function(){
$('#cropper').croppie({

url: '/img/image.jpg',
// viewport options
viewport: {
width: 200,
height: 200,
type: 'circle'
},
// boundary options
boundary: {
width: 300,
height: 300
}
});
});*/
