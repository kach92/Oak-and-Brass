//-------------navigation js start

document.addEventListener('DOMContentLoaded', () => {

// Get all "navbar-burger" elements
const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

// Check if there are any navbar burgers
if ($navbarBurgers.length > 0) {

  // Add a click event on each of them
  $navbarBurgers.forEach( el => {
    el.addEventListener('click', () => {

      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');

    });
  });
}

});

//-------------navigation js end




$(document).ready(function(){
  Paloma.start();
});

Paloma.controller('Furnitures', {
    show: function(){
        let furniture_id = $('.temp_information').data('temp')
    // Executes when Rails Users#new is executed.
        const ajaxCall = function(e){

            // console.log($('.color').val())
            // console.log($('.capacity').val())
            $.ajax({
                url: `/furnitures/${furniture_id}/optionajax?color="${$('.color').val()}"&capacity="${$('.capacity').val()}"&material="${$('.material').val()}"&type="${$('.type').val()}"`,
                type: 'GET',
                dataType: 'json',

                success: function(data, textStatus, xhr) {
                    console.log(data[0].image)
                    $(".furniture_image").attr("src",data[0].image)
                    $(".price").text(data[0].price)
                    $(".furniture_option_id_input").val(data[0].id)
                },
                error: function(xhr, textStatus, errorThrown) {
                    console.log('Error in Database');
                }
            })


        }
        $(".color").change(ajaxCall)
        $(".capacity").change(ajaxCall)

  }
});
