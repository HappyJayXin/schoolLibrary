$(document).ready(function() {
  // 樓層介紹button 12F寬度設定
  $(".btnF")
    .eq(6)
    .css("width", "97%");

  // menu出現消失
  $("nav a").on("click", function() {
    $(this)
      .next()
      .not(":animated")
      .slideToggle();
  });

  // photo slider
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 30,
    navText: [
      '<i class="fa fa-angle-left"></i>',
      '<i class="fa fa-angle-right"></i>'
    ],
    nav: true,
    autoplay: true,
    autoplayTimeout: 3500,
    responsiveClass: true,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1
      },
      500: {
        items: 2
      },
      900: {
        items: 3
      }
    }
  });

  // 載入表格
  $bookTable = $("#book_tb");
  let libData = [
    ["總類", " 	43,148"],
    ["哲學類", "13,619"],
    ["宗教類", "5,194"],
    ["自然科學類", "31,848"],
    ["應用科學類", "66,724"],
    ["社會科學類", "54,910"],
    ["史地類(含世界史地類)", "25,575"],
    ["語文類", "59,944"],
    ["美術類", "22,403"]
  ];
  let table = "";
  let rows = libData.length;
  let cols = 2;
  table += "<tr class = 'headTb'><th>圖書分類收藏</th><th>冊數</th></tr>";
  for (var r = 0; r < rows; r++) {
    table += "<tr>";
    for (var c = 0; c < cols; c++) {
      table += "<td>" + libData[r][c] + "</td>";
    }
    table += "</td>";
  }
  $bookTable.html(table);

  // table搜尋
  let $input = $("#searchInput");

  $input.on("keyup", function() {
    let $filter = $input.val().trim();
    $("#book_tb tr")
      .not(".headTb")
      .filter(function() {
        $(this).toggle(
          $(this)
            .text()
            .indexOf($filter) > -1
        );
      });
  });

  // js load image
  var imageArr = [
    "img/lib1.jpg",
    "img/lib2.jpg",
    "img/lib3.jpg",
    "img/lib4.jpg",
    "img/lib5.jpg",
    "img/lib6.jpg"
  ];
  for (let i = 0; i < imageArr.length; i++) {
    $(".imgslide" + i).attr("src", imageArr[i]);
  }

  // link to cheese article
  let $menu = $(".menu ul li a");
  let $jump = $(".jump");

  function moveToArticle(pos) {
    $.each(pos, function() {
      $(this).on("click", function(e) {
        e.preventDefault();
        let href = $(this).attr("href");
        $("html, body").animate(
          {
            scrollTop: $(href).offset().top
          },
          1000
        );
        // Click the menu item, let menu close
        if (pos === $menu) {
          $(".menu").slideToggle();
        }
      });
    });
  }
  moveToArticle($menu);
  moveToArticle($jump);

  // back to top
  $(window).scroll(function() {
    if ($(this).scrollTop() > 700) {
      $(".bkTop").fadeIn(200);
    } else {
      $(".bkTop").fadeOut(200);
    }
  });
  $(".bkTop").click(function(e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 500);
  });

  // ajax floor choose
  let floorDetail;
  $.ajax({
    url: "data/floorDetail.json",
    type: "GET",
    dataType: "json",
    success: function(data) {
      // console.log(data);
      floorDetail = data;
    },
    error: function() {
      console.log("無法取得樓層介紹資料");
    }
  });
  // click各樓層並介紹
  $(".floorbtn").on("click", "button", function(e) {
    e.preventDefault();
    let floor = this.id;
    let content = "";
    let $floorTitle = $(".floorTitle"); // 樓層介紹標題
    let $floorDetail = $(".floorDetail p"); // 樓層介紹內文
    $floorTitle.text(floorDetail[floor][0].title);
    $floorDetail.text(floorDetail[floor][0].content);
    $(".btnF").removeClass("active"); // 移除選種class
    $(this).addClass("active"); // 所選button加上class
  });  
});
