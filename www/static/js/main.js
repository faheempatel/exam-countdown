$('document').ready(function() {
  var json = {
    "ecs524u": {
      "name": "Internet Protocols and Applications",
      "timestamp": "2014-04-28T10:00:00+00:00",
      "venue": "John Orwell Sports Centre",
      "googleMapsUrl": "https://goo.gl/maps/Cw8dM"
    },
    "ecs505u": {
      "name": "Software Engineering",
      "timestamp": "2014-05-06T14:30:00+00:00",
      "venue": "Sports Hall"
    },
    "ecs518u": {
      "name": "Operating Systems",
      "timestamp": "2014-05-08T14:30:00+00:00",
      "venue": "BANC-113"
    },
    "ecs522u": {
      "name": "Graphical User Interfaces",
      "timestamp": "2014-05-14T14:30:00+00:00",
      "venue": "Octagon"
    },
    "ecs519u": {
      "name": "Database Systems",
      "timestamp": "2014-05-16T10:00:00+00:00",
      "venue": "Stratford Town Hall",
      "googleMapsUrl": "https://goo.gl/maps/EcVmB"
    },
    "ecs509u": {
      "name": "Probability and Matrices",
      "timestamp": "2014-05-19T14:30:00+00:00",
      "venue": "John Orwell Sports Centre",
      "googleMapsUrl": "https://goo.gl/maps/Cw8dM"
    },
    "ecs510u": {
      "name": "Algorithms and Data Structures in an Object-Oriented Framework",
      "timestamp": "2014-05-23T10:00:00+00:00",
      "venue": "Octagon"
    }
  };

  function daysBetween(timestamp) {
    // The number of milliseconds in one day
    var ONE_DAY = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    var current = new Date().getTime();
    var exam = new Date(timestamp).getTime();

    // Calculate the difference in milliseconds
    var difference = (exam - current);

    // Convert back to days and return
    return Math.round(difference/ONE_DAY);
  }

  function appendExam(div, exam) {
    var date = new Date(exam.timestamp);
    var location = '<p>' + exam.venue + '</p>';
    if (exam.googleMapsUrl) {
      location = '<p>' + exam.venue
        + '<br/>(<a href="'
        + exam.googleMapsUrl
        + '">Google Maps</a>)</p>';
    }

    var plural = exam.timeDifference === -1 ? 'day' : 'days';
    var difference = exam.timeDifference < 0 ? 'was ' + Math.abs(exam.timeDifference) + ' ' + plural + ' ago' : 'in ' + exam.timeDifference + ' ' + plural;
    div.append(
        '<div class="exam">'
      + '<h2>' + exam.name.toUpperCase() + '</h2>'
      + '<p><strong>' + difference + '</strong></p>'
      + '<p>' + date.toUTCString().slice(0, -7) + ' GMT</p>'
      + location
      + '</div>'
    );
  }

  var exam;
  var nextUp = true;
  var completedExams = [];

  for (var module in json) {
    exam = json[module];
    exam.timeDifference = daysBetween(exam.timestamp);
    if (exam.timeDifference < 0) {
      completedExams.push(exam);
    }
    else if (nextUp) {
      appendExam($('.next-up'), exam);
      nextUp = false;
    } else {
      appendExam($('.later'), exam);
    }
  }

  // Append completed exams to the end
  if (completedExams.length > 0) {
    $('.container').append('<div class="completed"></div>');
    for (var i = 0; i < completedExams.length; i++) {
      exam = completedExams[i];
      appendExam($('.completed'), exam);
    }
  }

  var t = new Trianglify({
      x_gradient: colorbrewer.BuPu[9]
    , y_gradient: ['#7CA1FF', '#838eca']
    , noiseIntensity: 0});
  var pattern = t.generate(document.body.clientWidth, document.body.clientHeight);
  document.body.setAttribute('style', 'background-image: '+pattern.dataUrl);
});
