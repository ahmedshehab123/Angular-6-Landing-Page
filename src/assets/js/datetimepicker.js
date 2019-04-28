

 $("#datetimepicker1").datetimepicker({
    minDate: 0,
    format: 'YYYY-MM-DD hh:mm:ss A',
  });


 $('#datetimepicker1').on('dp.change', function(e){
    $(".input-datetimepicker1").change();
 });

 // $(".input-datetimepicker1").change(function(evt) {
 //   alert('jquery');
 //   console.log(evt);
 //   $(".input-datetimepicker1").val("A").change();
 // });


