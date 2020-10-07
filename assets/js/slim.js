jQuery(function () {
  'use strict';

  // showing 2nd level sub menu while hiding others
  jQuery('.sidebar-nav-link').on('click', function (e) {
    var subMenu = jQuery(this).next();

    jQuery(this).parent().siblings().find('.sidebar-nav-sub').slideUp();
    jQuery('.sub-with-sub ul').slideUp();

    if (subMenu.length) {
      e.preventDefault();
      subMenu.slideToggle();
    }
  });

  // showing 3rd level sub menu while hiding others
  jQuery('.sub-with-sub .nav-sub-link').on('click', function (e) {
    e.preventDefault();
    jQuery(this).parent().siblings().find('ul').slideUp();
    jQuery(this).next().slideDown();
  });

  jQuery('#slimSidebarMenu').on('click', function (e) {
    e.preventDefault();
    if (window.matchMedia('(min-width: 1200px)').matches) {
      jQuery('body').toggleClass('hide-sidebar');
    } else {
      jQuery('body').toggleClass('show-sidebar');
    }
  });

  if ($.fn.perfectScrollbar) {
    jQuery('.slim-sidebar').perfectScrollbar({
      suppressScrollX: true
    });
  }

  // jQuery('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });


  /////////////////// START: TEMPLATE SETTINGS /////////////////////
  var loc = window.location.pathname;
  var path = loc.split('/');
  var isRtl = (path[1].indexOf('rtl') >= 0) ? true : false;   // path[2] for production
  var isSidebar = (path[1].indexOf('sidebar') >= 0) ? true : false; // path[2] for production
  var newloc = '';

  // inject additional link tag for header skin
  jQuery('head').append('<link id="headerSkin" rel="stylesheet" href="">');

  // inject template options content
  $.get('../settings.html', function (data) {
    jQuery('body').append(data);

    if ($.fn.perfectScrollbar) {
      jQuery('.template-options-inner').perfectScrollbar({
        suppressScrollX: true
      });
    }

    // set direction value in settings
    if (isRtl) {
      jQuery('.slim-direction[value="rtl"]').prop('checked', true);
    } else {
      jQuery('.slim-direction[value="ltr"]').prop('checked', true);
    }

    if (isSidebar) {
      jQuery('.nav-layout[value="vertical"]').prop('checked', true);
    } else {
      jQuery('.nav-layout[value="horizontal"]').prop('checked', true);
    }

    //check if header set to sticky
    if ($.cookie('sticky-header')) {
      jQuery('body').addClass('slim-sticky-header');
      jQuery('.sticky-header[value="yes"]').prop('checked', true);
    } else {
      jQuery('.sticky-header[value="no"]').prop('checked', true);
    }

    //check if header have skin
    if ($.cookie('header-skin')) {
      var sk = $.cookie('header-skin');
      jQuery('body').addClass(sk);
      jQuery('#headerSkin').attr('href', '../css/slim.' + sk + '.css');
      jQuery('.header-skin[value="' + sk + '"]').prop('checked', true);
    } else {
      jQuery('.header-skin[value="default"]').prop('checked', true);
    }

    //check if page set to wide
    if ($.cookie('full-width')) {
      jQuery('body').addClass('slim-full-width');
      jQuery('.full-width[value="yes"]').prop('checked', true);
    } else {
      jQuery('.full-width[value="no"]').prop('checked', true);
    }

    //check if sidebar set to sticky
    if ($.cookie('sticky-sidebar') && jQuery('.slim-sidebar').length) {
      jQuery('body').addClass('slim-sticky-sidebar');
      jQuery('.sticky-sidebar[value="yes"]').prop('checked', true);
    } else {
      jQuery('.sticky-sidebar[value="no"]').prop('checked', true);
    }
  });

  // show/hide template options panel
  jQuery('body').on('click', '.template-options-btn', function (e) {
    e.preventDefault();
    jQuery('.template-options-wrapper').toggleClass('show');
  });

  // set current page to light mode
  jQuery('body').on('click', '.skin-light-mode', function (e) {
    e.preventDefault();
    newloc = loc.replace('template-dark', 'template');
    if (isSidebar) {
      newloc = loc.replace('sidebar-dark', 'sidebar');
    }
    jQuery(location).attr('href', newloc);
  });

  // set current page to dark mode
  jQuery('body').on('click', '.skin-dark-mode', function (e) {
    e.preventDefault();
    if (loc.indexOf('template-dark') >= 0) {
      newloc = loc;
    } else {
      newloc = loc.replace('template', 'template-dark');
      if (isSidebar) {
        newloc = loc.replace('sidebar', 'sidebar-dark');
      }
    }
    jQuery(location).attr('href', newloc);
  });

  // set current page to rtl/ltr direction
  jQuery('body').on('click', '.slim-direction', function () {
    var val = jQuery(this).val();

    if (val === 'rtl') {
      if (!isRtl) {
        if (path[2]) {
          newloc = '/' + path[1] + '-rtl/' + path[2];
        } else {
          newloc = '/' + path[1] + '-rtl/';
        }
        jQuery(location).attr('href', newloc);
      }
    } else {
      if (isRtl) {
        if (path[2]) {
          newloc = '/' + path[1].replace('-rtl', '') + '/' + path[2];
        } else {
          newloc = '/' + path[1].replace('-rtl', '') + '/';
        }
        jQuery(location).attr('href', newloc);
      }
    }
  });

  // set current page to sidebar/navbar
  jQuery('body').on('click', '.nav-layout', function () {
    var val = jQuery(this).val();

    if (val === 'vertical') {
      if (!isSidebar) {
        if (loc.indexOf('-dark') >= 0) {
          if (path[2]) {
            newloc = '/sidebar-dark/' + path[2];
          } else {
            newloc = '/sidebar-dark/';
          }
        } else {
          if (path[2]) {
            newloc = '/sidebar/' + path[2];
          } else {
            newloc = '/sidebar/';
          }
        }
        jQuery(location).attr('href', newloc);
      }
    } else {
      if (isSidebar) {
        if (path[2]) {
          newloc = '/' + path[1].replace('sidebar', 'template') + '/' + path[2];
        } else {
          newloc = '/' + path[1].replace('sidebar', 'template') + '/';
        }
        jQuery(location).attr('href', newloc);
      }
    }
  });

  // toggles header to sticky
  jQuery('body').on('click', '.sticky-header', function () {
    var val = jQuery(this).val();
    if (val === 'yes') {
      $.cookie('sticky-header', 'true');
      jQuery('body').addClass('slim-sticky-header');
    } else {
      $.removeCookie('sticky-header');
      jQuery('body').removeClass('slim-sticky-header');
    }
  });

  // toggles sidebar to sticky
  jQuery('body').on('click', '.sticky-sidebar', function () {
    if (jQuery('.slim-sidebar').length) {
      var val = jQuery(this).val();
      if (val === 'yes') {
        $.cookie('sticky-sidebar', 'true');
        jQuery('body').addClass('slim-sticky-sidebar');
      } else {
        $.removeCookie('sticky-sidebar');
        jQuery('body').removeClass('slim-sticky-sidebar');
      }
    } else {
      alert('Can only be used when navigation is set to vertical');
      jQuery('.sticky-sidebar[value="no"]').prop('checked', true);
    }
  });

  // set skin to header
  jQuery('body').on('click', '.header-skin', function () {
    var val = jQuery(this).val();
    if (val !== 'default') {
      $.cookie('header-skin', val);
      jQuery('#headerSkin').attr('href', '../css/slim.' + val + '.css');
    } else {
      $.removeCookie('header-skin');
      jQuery('#headerSkin').attr('href', '');
    }
  });

  // set page to wide
  jQuery('body').on('click', '.full-width', function () {
    var val = jQuery(this).val();
    if (val === 'yes') {
      $.cookie('full-width', 'true');
      jQuery('body').addClass('slim-full-width');
    } else {
      $.removeCookie('full-width');
      jQuery('body').removeClass('slim-full-width');
    }
  });

  /////////////////// END: TEMPLATE SETTINGS /////////////////////


});
