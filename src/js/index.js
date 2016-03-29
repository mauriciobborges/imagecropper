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
    width: 400,
    height: 400,
    type: 'circle'
  },
  boundary: {
    width: 400,
    height: 400
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
    var dl = document.createElement('img');
    dl.setAttribute('id', 'imageResult')
    dl.setAttribute('src', resp);
    dl.setAttribute('style', 'display: none;');
    $('#result').append(dl);

    convert(dl,downloadData);
  });
});

var downloadData = function(){
    var data = document.getElementById('imageResult').toDataURL();

    var a = document.createElement('a');
    a.href = data;
    a.download = "image.png"  ;
    document.body.appendChild(a);
    a.click();
    $('#result').empty();
}

var convert = function(element,cb){
  Caman(element, function () {
    if($('#filter').is(":checked")){
      this.greyscale();
    }
    this.render(cb);
  });
}