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
        let color = null
        let capacity = null
        let kuan = null
        let material = null

        let furniture_id = $('.temp_information').data('temp')


        const addEventListenerToImages = function(){
            let images = document.querySelectorAll(".individual-images");
            let main_image = document.querySelector(".furniture_image");
            images.forEach(x=>x.addEventListener("click",function(){
                    main_image.src = event.target.src
                })
            )
        }

        const normalCall = function(data){
            $(".furniture_image").attr("src",JSON.parse(data.furniture)[0].image)
            $(".price").text("$"+JSON.parse(data.furniture)[0].price.toFixed(2))
            $(".furniture_option_id_input").val(JSON.parse(data.furniture)[0].id)
            $("#short-description").text(data.furniture_description[0].short)
            $("#long-description").text(data.furniture_description[0].long)
            let images_arr = JSON.parse(data.furniture_images)
            $(".furniture-image-list").append(`<img class="individual-images" src="${JSON.parse(data.furniture)[0].image}"  />`)
            images_arr.forEach(x=>{
                $(".furniture-image-list").append(`<img class="individual-images" src="${x.image}" />`)
            })
            addEventListenerToImages();
            console.log("done")
        }

        const ajaxCallInitial = function(e){
            //START FROM HERE
            color = $(".color-initial").val()
            capacity = $(".capacity-initial").val()
            kuan = $(".kuan-initial").val()
            material = $(".material-initial").val()
            $.ajax({
                url: `/furnitures/${furniture_id}/optionajax?color="${color}"&capacity="${capacity}"&material="${material}"&kuan="${kuan}"`,
                type: 'GET',
                dataType: 'json',

                success: function(data, textStatus, xhr) {
                    normalCall(data)
                },
                error: function(xhr, textStatus, errorThrown) {
                    console.log('Error in Database');
                }
            })


        }

        const ajaxCall = function(){
            $(".furniture-image-list").html("")
            color = event.target.getAttribute("name") === "color"? event.target.getAttribute("value") : color;
            capacity = event.target.getAttribute("name") === "capacity"? event.target.getAttribute("value") : capacity;
            material = event.target.getAttribute("name") === "material"? event.target.getAttribute("value") : material;
            kuan = event.target.getAttribute("name") === "kuan"? event.target.getAttribute("value") : kuan;
            $.ajax({
                url: `/furnitures/${furniture_id}/optionajax?color="${color}"&capacity="${capacity}"&material="${material}"&kuan="${kuan}"`,
                type: 'GET',
                dataType: 'json',

                success: function(data, textStatus, xhr) {
                    normalCall(data)
                },
                error: function(xhr, textStatus, errorThrown) {
                    console.log('Error in Database');
                }
            })


        }
        ajaxCallInitial();
        $(".color").each(function(){
            let x = this
            x.addEventListener("click",ajaxCall)
        })
        $(".capacity").each(function(){
            let x = this
            x.addEventListener("click",ajaxCall)
        })
        $(".material").each(function(){
            let x = this
            x.addEventListener("click",ajaxCall)
        })
        $(".kuan").each(function(){
            let x = this
            x.addEventListener("click",ajaxCall)
        })


        $(".add-to-cart-button").click(function(){
            $.ajax({
                url: `/carts`,
                type: 'POST',
                data:{quantity:$("#quantity-input").val(),furniture_option_id :$(".furniture_option_id_input").val()},
                dataType: 'json',

                success: function(data, textStatus, xhr) {
                    console.log("POST TO CART DONE")
                    console.log($(".cart-count").text())
                    $(".cart-count").text(parseInt($(".cart-count").text())+1)
                },
                error: function(xhr, textStatus, errorThrown) {
                    console.log('Error in Database');
                }
            })
        })

        $(".add-to-wishlist-button").click(function(){
            $.ajax({
                url: `/wishlists`,
                type: 'POST',
                data:{furniture_option_id :$(".furniture_option_id_input").val()},
                dataType: 'json',

                success: function(data, textStatus, xhr) {
                    console.log("POST TO WISHLIST DONE")
                    console.log($(".wish-count").text())
                    $(".wish-count").text(parseInt($(".wish-count").text())+1)
                },
                error: function(xhr, textStatus, errorThrown) {
                    console.log('Error in Database');
                }
            })
        })

        //FOR MODAL///////////////////////////////
        const refreshModal = function(data){
            $("table").html("")
            $("table").append(`<tr>
                <th></th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Image</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th></th>
              </tr>`)
            data.forEach(x=>{
                $("table").append(`
                    <tr>
                        <td><input type="checkbox" name="selected_cart_ids[]" value="${x.cart_id}"/></td>
                        <td>${x.furniture_name}</td>
                        <td>${x.price.toFixed(2)}</td>
                        <td>${x.category}</td>
                        <td><img src="${x.image}" style="width:200px;"/</td>
                        <td>${x.quantity}</td>
                        <td>${(x.quantity*x.price).toFixed(2)}</td>
                        <td><div class="button is-success cart-delete">Delete<input value="${x.cart_id}"hidden/></div></td>
                    </tr>
                    `)

            })


        }

        const resetDestroyButton = function(){
             $(".cart-delete").each(function(){
                let eachDelete = this
                eachDelete.addEventListener("click",function(){
                    let deleteDiv = event.target
                    $.ajax({

                        url: `/carts/${deleteDiv.lastElementChild.value}`,
                        type: 'DELETE',
                        dataType: 'json',

                        success: function(data, textStatus, xhr) {
                            document.querySelector("table").removeChild(deleteDiv.parentNode.parentNode)
                            $(".cart-count").text(parseInt($(".cart-count").text())-1)
                        },
                        error: function(xhr, textStatus, errorThrown) {
                            console.log('Error in Database');
                        }
                    })
                })
            })
        }
        const togglingOn = function(){
            $(".modal").show()

            $.ajax({
                url: `/carts`,
                type: 'GET',
                dataType: 'json',

                success: function(data, textStatus, xhr) {
                    refreshModal(data)
                    resetDestroyButton();

                },
                error: function(xhr, textStatus, errorThrown) {
                    console.log('Error in Database');
                }
            })
        }

        const togglingOff = function(){
            $(".modal").hide()
        }

        $(".cart-modal").click(togglingOn)
        $("#modal-cancel-button").click(togglingOff)
        $("#modal-x-button").click(togglingOff)

        /////////////////////////////////////////


    },
    index: function(){


        const doSort = function(){
            console.log("TEST")
            let items = document.querySelectorAll(".for-sort");
            let itemsArr = []
            items.forEach(x=>itemsArr.push(x))
            if($(this).val() === "name-asc"){
                itemsArr = itemsArr.sort(function(a,b){
                    if(a.childNodes[1].childNodes[1].childNodes[3].childNodes[1].childNodes[1].innerText < b.childNodes[1].childNodes[1].childNodes[3].childNodes[1].childNodes[1].innerText) { return -1; }
                    if(a.childNodes[1].childNodes[1].childNodes[3].childNodes[1].childNodes[1].innerText > b.childNodes[1].childNodes[1].childNodes[3].childNodes[1].childNodes[1].innerText) { return 1; }
                    return 0;
                   })
            }else if($(this).val() === "name-dsc"){
                itemsArr = itemsArr.sort(function(a,b){
                    if(a.childNodes[1].childNodes[1].childNodes[3].childNodes[1].childNodes[1].innerText > b.childNodes[1].childNodes[1].childNodes[3].childNodes[1].childNodes[1].innerText) { return -1; }
                    if(a.childNodes[1].childNodes[1].childNodes[3].childNodes[1].childNodes[1].innerText < b.childNodes[1].childNodes[1].childNodes[3].childNodes[1].childNodes[1].innerText) { return 1; }
                    return 0;
                   })
            }else if($(this).val() === "price-asc"){
                itemsArr = itemsArr.sort(function(a,b){
                    return parseFloat(a.childNodes[1].childNodes[1].childNodes[3].childNodes[1].childNodes[3].innerText.replace( /^\D+/g, ''))-parseFloat(b.childNodes[1].childNodes[1].childNodes[3].childNodes[1].childNodes[3].innerText.replace( /^\D+/g, ''))
                })
            }else if($(this).val() === "price-dsc"){
                itemsArr = itemsArr.sort(function(a,b){
                    return parseFloat(b.childNodes[1].childNodes[1].childNodes[3].childNodes[1].childNodes[3].innerText.replace( /^\D+/g, ''))-parseFloat(a.childNodes[1].childNodes[1].childNodes[3].childNodes[1].childNodes[3].innerText.replace( /^\D+/g, ''))
                })
            }
            let mother = document.querySelector(".sort-mother")
            mother.innerHTML = ""
            console.log(mother.innerHTML)
            itemsArr.forEach(x=>mother.appendChild(x))

        }

        $(".sort-by").change(doSort)

        //FOR MODAL///////////////////////////////
        const refreshModal = function(data){
            $("table").html("")
            $("table").append(`<tr>
                <th></th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Image</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th></th>
              </tr>`)
            data.forEach(x=>{
                $("table").append(`
                    <tr>
                        <td><input type="checkbox" name="selected_cart_ids[]" value="${x.cart_id}"/></td>
                        <td>${x.furniture_name}</td>
                        <td>${x.price.toFixed(2)}</td>
                        <td>${x.category}</td>
                        <td><img src="${x.image}" style="width:200px;"/</td>
                        <td>${x.quantity}</td>
                        <td>${(x.quantity*x.price).toFixed(2)}</td>
                        <td><div class="button is-success cart-delete">Delete<input value="${x.cart_id}"hidden/></div></td>
                    </tr>
                    `)

            })


        }

        const resetDestroyButton = function(){
             $(".cart-delete").each(function(){
                let eachDelete = this
                eachDelete.addEventListener("click",function(){
                    let deleteDiv = event.target
                    $.ajax({

                        url: `/carts/${deleteDiv.lastElementChild.value}`,
                        type: 'DELETE',
                        dataType: 'json',

                        success: function(data, textStatus, xhr) {
                            document.querySelector("table").removeChild(deleteDiv.parentNode.parentNode)
                            $(".cart-count").text(parseInt($(".cart-count").text())-1)
                        },
                        error: function(xhr, textStatus, errorThrown) {
                            console.log('Error in Database');
                        }
                    })
                })
            })
        }
        const togglingOn = function(){
            $(".modal").show()

            $.ajax({
                url: `/carts`,
                type: 'GET',
                dataType: 'json',

                success: function(data, textStatus, xhr) {
                    refreshModal(data)
                    resetDestroyButton();

                },
                error: function(xhr, textStatus, errorThrown) {
                    console.log('Error in Database');
                }
            })
        }

        const togglingOff = function(){
            $(".modal").hide()
        }

        $(".cart-modal").click(togglingOn)
        $("#modal-cancel-button").click(togglingOff)
        $("#modal-x-button").click(togglingOff)
        /////////////////////////////////////////
    }

});
