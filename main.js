$(document).ready(function () {

  /* ============================================
     NAVBAR SCROLL EFFECT
     ============================================ */
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 60) {
      $('#navbar').addClass('scrolled');
    } else {
      $('#navbar').removeClass('scrolled');
    }
  });

  /* ============================================
     HAMBURGER MENU TOGGLE
     ============================================ */
  $('#hamburger').on('click', function () {
    $('.nav-links').toggleClass('open');
    $(this).toggleClass('active');
  });

  // Close nav when a link is clicked
  $('.nav-links a').on('click', function () {
    $('.nav-links').removeClass('open');
    $('#hamburger').removeClass('active');
  });

  /* ============================================
     TYPEWRITER EFFECT (Hero Section)
     ============================================ */
  var roles = [
    'Frontend Developer',
    'UI/UX Enthusiast',
    'JavaScript Engineer',
    'React Developer',
    'Open Source Contributor'
  ];
  var roleIndex = 0;
  var charIndex = 0;
  var isDeleting = false;

  function typeWriter() {
    var currentRole = roles[roleIndex];
    var $el = $('#typed-text');

    if (isDeleting) {
      $el.text(currentRole.substring(0, charIndex - 1));
      charIndex--;
    } else {
      $el.text(currentRole.substring(0, charIndex + 1));
      charIndex++;
    }

    var speed = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
      speed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 400;
    }

    setTimeout(typeWriter, speed);
  }

  if ($('#typed-text').length) {
    typeWriter();
  }

  /* ============================================
     COUNTER ANIMATION (Stats)
     ============================================ */
  function animateCounter($el) {
    var target = parseInt($el.data('target'));
    var duration = 1500;
    var step = target / (duration / 16);
    var current = 0;

    var timer = setInterval(function () {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      $el.text(Math.floor(current) + '+');
    }, 16);
  }

  var statsAnimated = false;
  function checkStats() {
    if (statsAnimated) return;
    var $stats = $('.hero-stats');
    if ($stats.length === 0) return;
    var statsTop = $stats.offset().top;
    var windowBottom = $(window).scrollTop() + $(window).height();
    if (windowBottom > statsTop - 50) {
      statsAnimated = true;
      $('.stat-num').each(function () {
        animateCounter($(this));
      });
    }
  }

  // Trigger immediately since hero is visible on load
  setTimeout(checkStats, 500);
  $(window).on('scroll', checkStats);

  /* ============================================
     SKILL BARS ANIMATION (Resume Page)
     ============================================ */
  function animateSkillBars() {
    $('.skill-bar-fill').each(function () {
      var $bar = $(this);
      var width = $bar.data('width');
      var barTop = $bar.offset().top;
      var windowBottom = $(window).scrollTop() + $(window).height();
      if (windowBottom > barTop - 50 && !$bar.hasClass('animated')) {
        $bar.addClass('animated');
        $bar.animate({ width: width + '%' }, 1200);
      }
    });
  }

  animateSkillBars();
  $(window).on('scroll', animateSkillBars);

  /* ============================================
     SKILL CARDS SCROLL ANIMATION (Home)
     ============================================ */
  function animateSkillCards() {
    $('.skill-card').each(function () {
      var cardTop = $(this).offset().top;
      var windowBottom = $(window).scrollTop() + $(window).height();
      var delay = $(this).data('delay') || 0;
      if (windowBottom > cardTop - 50 && !$(this).hasClass('visible')) {
        var $card = $(this);
        setTimeout(function () {
          $card.addClass('visible');
        }, delay);
      }
    });
  }
  animateSkillCards();
  $(window).on('scroll', animateSkillCards);

  /* ============================================
     FADE-IN ON SCROLL (Generic)
     ============================================ */
  function fadeInOnScroll() {
    $('.fade-in').each(function () {
      var elemTop = $(this).offset().top;
      var windowBottom = $(window).scrollTop() + $(window).height();
      if (windowBottom > elemTop - 60) {
        $(this).addClass('visible');
      }
    });
  }
  fadeInOnScroll();
  $(window).on('scroll', fadeInOnScroll);

  /* ============================================
     TIMELINE ITEMS ANIMATION
     ============================================ */
  function animateTimeline() {
    $('.timeline-content').each(function () {
      var top = $(this).offset().top;
      var windowBottom = $(window).scrollTop() + $(window).height();
      if (windowBottom > top - 60 && !$(this).hasClass('animated')) {
        $(this).addClass('animated').css({ opacity: 0, transform: 'translateX(-20px)' });
        var $el = $(this);
        setTimeout(function () {
          $el.css({ transition: 'all 0.5s ease', opacity: 1, transform: 'translateX(0)' });
        }, 50);
      }
    });
  }
  animateTimeline();
  $(window).on('scroll', animateTimeline);

  /* ============================================
     CONTACT FORM VALIDATION
     ============================================ */
  if ($('#contactForm').length) {

    // Character Counter
    $('#message').on('input', function () {
      var len = $(this).val().length;
      if (len > 500) {
        $(this).val($(this).val().substring(0, 500));
        len = 500;
      }
      $('#charCount').text(len + ' / 500');
    });

    // Validation Helper
    function showError(fieldId, msg) {
      $('#' + fieldId).addClass('error');
      $('#' + fieldId + '-error').text(msg).addClass('show');
    }

    function clearError(fieldId) {
      $('#' + fieldId).removeClass('error');
      $('#' + fieldId + '-error').removeClass('show');
    }

    // Real-time validation
    $('#fname').on('input', function () {
      if ($(this).val().trim().length >= 2) clearError('fname');
    });
    $('#lname').on('input', function () {
      if ($(this).val().trim().length >= 2) clearError('lname');
    });
    $('#email').on('input', function () {
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test($(this).val())) clearError('email');
    });
    $('#subject').on('change', function () {
      if ($(this).val()) clearError('subject');
    });
    $('#message').on('input', function () {
      if ($(this).val().trim().length >= 20) clearError('message');
    });

    // Form Submit
    $('#contactForm').on('submit', function (e) {
      e.preventDefault();

      var isValid = true;

      var fname = $('#fname').val().trim();
      var lname = $('#lname').val().trim();
      var email = $('#email').val().trim();
      var subject = $('#subject').val();
      var message = $('#message').val().trim();
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (fname.length < 2) {
        showError('fname', 'Please enter a valid first name (min 2 chars)');
        isValid = false;
      } else { clearError('fname'); }

      if (lname.length < 2) {
        showError('lname', 'Please enter a valid last name (min 2 chars)');
        isValid = false;
      } else { clearError('lname'); }

      if (!emailRegex.test(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
      } else { clearError('email'); }

      if (!subject) {
        showError('subject', 'Please select a subject');
        isValid = false;
      } else { clearError('subject'); }

      if (message.length < 20) {
        showError('message', 'Message must be at least 20 characters');
        isValid = false;
      } else { clearError('message'); }

      if (!isValid) return;

      // Simulate submission
      var $btn = $('#submitBtn');
      $('#btnText').hide();
      $('#btnLoader').show();
      $btn.prop('disabled', true);

      setTimeout(function () {
        $('.contact-form form > *:not(#formSuccess)').hide();
        $('#formSuccess').fadeIn(500);
        $btn.prop('disabled', false);
        $('#btnText').show();
        $('#btnLoader').hide();
      }, 2000);
    });
  }

  /* ============================================
     PROJECT CARDS HOVER EFFECT (jQuery animate)
     ============================================ */
  $('.project-card').on('mouseenter', function () {
    $(this).find('.project-icon').stop(true).animate({ marginTop: '-8px' }, 200);
  }).on('mouseleave', function () {
    $(this).find('.project-icon').stop(true).animate({ marginTop: '0px' }, 200);
  });

  /* ============================================
     SMOOTH ANCHOR SCROLL
     ============================================ */
  $('a[href^="#"]').on('click', function (e) {
    var target = $($(this).attr('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: target.offset().top - 80 }, 600, 'swing');
    }
  });

  /* ============================================
     BIODATA SECTION HOVER EFFECTS
     ============================================ */
  $('.bio-row').on('mouseenter', function () {
    $(this).css('background', 'rgba(167,139,250,0.05)');
  }).on('mouseleave', function () {
    $(this).css('background', 'transparent');
  });

  /* ============================================
     NAVBAR ACTIVE LINK HIGHLIGHT
     ============================================ */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  $('.nav-links a').each(function () {
    var linkPage = $(this).attr('href');
    if (linkPage === currentPage) {
      $(this).addClass('active');
    }
  });

});
