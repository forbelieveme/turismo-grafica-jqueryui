$(document).ready(function () {
  //Counter
  counter = 0;
  //Make element draggable
  $(".drag").draggable({
    helper: "clone",
    containment: "frame",
    revert: "invalid",
    //When first dragged
    stop: function (ev, ui) {
      var pos = $(ui.helper).offset();
      objName = "#clonediv" + counter;
      $(objName).css({ left: pos.left, top: pos.top });
      $(objName).removeClass("drag");

      //When an existiung object is dragged
      $(objName).draggable({
        containment: "parent",
        stop: function (ev, ui) {
          var pos = $(ui.helper).offset();
          // console.log($(this).attr("id"));
          // console.log(pos.left);
          // console.log(pos.top);
        },
      });
    },
  });
  //Make element droppable
  $("#frame").droppable({
    drop: function (ev, ui) {
      if ($("#frame div").length == 0) {
        $("#frame").html("");
      }
      if (ui.helper.attr("id").search(/drag([1-9]|1[0-2])\b/) != -1) {
        counter++;
        var element = $(ui.draggable).clone();
        element.addClass("tempclass");
        $(this).append(element);
        $(".tempclass").attr("id", "clonediv" + counter);
        $("#clonediv" + counter).removeClass("tempclass");

        //Get the dynamically item id
        draggedNumber = ui.helper.attr("id").search(/drag([1-9]|1[0-2])\b/);
        itemDragged = "dragged" + RegExp.$1;
        // console.log(itemDragged);

        $("#clonediv" + counter).addClass(itemDragged);
      }
    },
  });
});
