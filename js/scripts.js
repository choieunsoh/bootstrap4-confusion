$(function () {
  // Carousel
  $("#mycarousel").carousel({ interval: 2000 });
  $("#carouselButton").on("click", (e) => {
    e.preventDefault();
    const $btn = $("#carouselButton");
    const pause = $btn.hasClass("btn-danger");
    if (pause) {
      $btn.removeClass("btn-danger").addClass("btn-success");
      $btn.children("span").removeClass("fa-pause").addClass("fa-play");
      $("#mycarousel").carousel("pause");
    } else {
      $btn.removeClass("btn-success").addClass("btn-danger");
      $btn.children("span").removeClass("fa-play").addClass("fa-pause");
      $("#mycarousel").carousel("cycle");
    }
    return false;
  });

  // Modal
  $("button.btn-close").on("click", (e) => {
    e.preventDefault();
    $(e.target).parents(".modal").modal("hide");
    return false;
  });
  $("#loginButton").on("click", (e) => {
    e.preventDefault();
    $("#loginModal").modal("show");
    return false;
  });
  $("#reserveButton").on("click", (e) => {
    e.preventDefault();
    $("#reserveModal").modal("show");
    return false;
  });
});
