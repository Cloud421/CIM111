window.addEventListener("load", function (event) {

  initStepsList();

  //Accordion functionality
  $('.close').click(function () {
    var $element = $(this); //.close button
    var $listGroupItem = $element.parent().parent(); //Parent is list-group-item
    var $child = $listGroupItem.find('p'); //Step info

    $child.slideUp();
    $element.hide();

    var stepTitle = $listGroupItem.find('.step-title');
    var optional = false;
    if(stepTitle.html().includes('(optional)')) {
      var text = stepTitle.text();
      text = text.replace('(optional)', '');
      stepTitle.text(text);
      optional = true;
    }

    var hiddenHTML = '<i class="small text-muted hidden mx-2"> (hidden) </i>';
    var revealHTML = '<a class="small text-primary font-italic ml-auto reveal" style="cursor: pointer;"> show </a>';
    insertAfterElement($listGroupItem, 'div > strong', hiddenHTML);
    insertAfterElement($listGroupItem, '.hidden', revealHTML);

    var reveal = $listGroupItem.find('.reveal');
    reveal.click(function () {
      $(this).remove(); //remove reveal prompt text
      $listGroupItem.find('.hidden').remove(); //remove hidden text

      $listGroupItem.find('p').slideDown(); //show step info
      $element.show(); //show .close button

      if(optional) {
        var optionalText = '<span class="text-muted font-italic small">(optional)</span>';
        stepTitle.append(optionalText);
      }

      reveal.off('click'); //remove event listener

    });

  });

  //Fading list items on mouseenter and mouseleave
  var listItems = $('.list-group.accordion > .list-group-item');
  listItems.mouseenter(function() {
    lightenElement($(this));
  })

  listItems.mouseleave(function() {
    darkenElement($(this));
  })

})

//Initialize steps by inserting them into DOM
function initStepsList() {
  var step1Content = 'Spread both slices of bread with mayonnaise';
  var step2Content = 'Top one bread slice, mayonnaise side up, with a piece of lettuce';
  var step3Content = 'Place tomato, turkey, bacon, and avocado on the same bread slice with mayonnaise';
  var step4Content = 'Toast in the oven for 5 minutes';
  
  var step1 = new Step(1, step1Content);
  var step2 = new Step(2, step2Content);
  var step3 = new Step(3, step3Content);
  var step4 = new Step(4, step4Content, true);
  var stepList = [step1, step2, step3, step4];

  //Insert steps into DOM using foreach loop
  stepList.forEach(function(step) {
    var content = step.content;

    var title;    
    if(step.optional) {
      title = step.title + ' <span class="text-muted font-italic small">(optional)</span>';
    } else {
      title = step.title;
    }

    var stepEntryHTML = buildListItemEntry(title, content);
    $('.accordion').append(stepEntryHTML);
  });
}

//Step object
function Step(number, content, optional = false) {
  this.number = number;
  this.content = content;
  this.optional = optional;
  this.title = 'Step ' + this.number.toString() + ':';

  function setTitle(title) {
    this.title = title;
  }
}

//Fade element darker (opacity: 1)
function darkenElement($element) {
  $element.fadeTo(300, 1.0);
}

//Fade element lighter (opacity: 0.85)
function lightenElement($element) {
  $element.fadeTo(300, 0.85);
}

//Inserts HTML code after specified element and identifier
function insertAfterElement($element, identifier, html) {
  $element.find(identifier).after(html);
}

//Build list entry for step
function buildListItemEntry(title, content) {
  var listEntry = 
  '<li class="list-group-item list-group-item-dark">'
  + '<div class="d-flex align-items-center">'
  + '<strong class="step-title">' + title + '</strong>'
  + '<span class="close ml-auto">&times;</span>'
  + '</div>'
  + '<p>'
  + '  <span class="small">'
  +       content
  + '  </span>'
  + '</p>'
  + '</li>';

  return  listEntry;
}