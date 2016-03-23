'use strict';

$('#cropper').croppie({
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

$('#image').change(function(){
  alert('oi');
});