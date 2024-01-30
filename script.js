const MATH_SAYINGS = ["Sharp as a pencil in math class!", "Adding up smiles with math skills!", "Counting success, one problem at a time!", "Dividing and conquering math challenges!", "Magician of math, making numbers disappear!", "Formula for math fun and friendship!", "Exploring math, finding the right path!", "Solving math puzzles at light speed!", "Geometric genius, shaping a bright future!", "Prime route to being a math champion!", "Balancing equations like a circus performer!", "Counting to the stars in math!", "Angles covered from all sides!", "Conductor of number symphonies!", "Fraction whiz, turning challenges into cake!", "Mastering past, present, and future in math!", "Graphing success on life's coordinate plane!", "Architect of math, building bridges to knowledge!", "Wordsmith of math, turning problems into stories!", "Mathematical architect, constructing bridges of learning!", "Mathemagical tricks are your specialty!", "You're a puzzle-solving wizard in math!", "Counting your way to victories!", "Geometry guru, shaping success!", "Math is your adventure, and you're the hero!", "Equation explorer, seeking solutions!", "Counting stars with your math skills!", "Graph guru, drawing the path to knowledge!", "Adding up the fun in every math problem!", "Math detective, cracking the code of numbers!", "Algebra architect, building strong foundations!", "In the math arena, you're the champion!", "Geometry conqueror, ruling the shapes!", "Math journeyer, discovering new horizons!", "Problem-solving pilot, soaring through math challenges!", "Equation artist, painting success with numbers!", "Math astronaut, exploring the universe of numbers!", "Math inventor, creating solutions with imagination!", "Arithmetic adventurer, navigating the world of numbers!", "Math explorer, mapping out your own success!"]

const NEW_STUDENT_MSG = "Hi there, PARENT! This message is a summary of how STUDENT did today. You will receive one at the end of every session! Today, STUDENT worked on the following topics; LISTTOPICS. STUDENT showed understanding on DIDWELL, and is working really hard! STUDENT still needs a little more practice on TOPRACTICE, but we are making progress! ADDMATHQUOTE"

const RANDOM_MSG = ["Hey there, PARENT! STUDENT did great during HISHER session! Today, STUDENT worked on these topics; LISTTOPICS. HESHE showed a great understanding of DIDWELL, and needs just a little more practice on TOPRACTICE, but we are seeing progress! ADDMATHQUOTE", "Hello, PARENT! STUDENT did an amazing job during HISHER session! STUDENT is working on the following topics; LISTTOPICS. STUDENT demonstrated a solid understanding of DIDWELL. STUDENT will benefit from additional practice on TOPRACTICE, but we are already seeing progress. ADDMATHQUOTE", "Hi, PARENT! STUDENT worked hard today during HISHER session. Today, STUDENT worked on the following topics; LISTTOPICS. STUDENT showed a strong grasp of DIDWELL, AND is doing amazing. STUDENT could benefit from a bit more practice on TOPRACTICE, but we are already seeing great progress! ADDMATHQUOTE", "Hi, PARENT! STUDENT did an excellent job during HISHER session today. HESHE worked on the following topics; LISTTOPICS. HESHE demonstrated a strong understanding of DIDWELL. STUDENT could use some more practice on TOPRACTICE, but we are already seeing good progress. ADDMATHQUOTE"]

const PRONOUNS = [["She", "He", "They"], ["her", "his", "their"], 
                 ["Her", "Him", "Their"]]

function make_topic_list(topics) {
  let msg = ""
  if (topics.length == 0){
    return msg
  } else if (topics.length > 2) {
    for (let i = 0; i < topics.length; i++) {
      msg += topics[i].value
      if (i == topics.length - 2) {
        msg += ", and "
      } else if (i != topics.length - 1) {
        msg += ", "
      }
    }
  } else if (topics.length == 2) {
      msg = topics[0].value + " and " + topics[1].value
  } else {
      msg = topics[0].value
  }
  return msg
}

function count_non_empty(arr) {
  let new_arr = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].value.length > 0) {
      new_arr.push(arr[i])
    }
  }
  return new_arr
}

function sort_topics(all_topics, checks) {
  let sorted = []
  for (let i = 0; i < checks.length; i++) {
    if (checks[i].checked) {
      sorted.push(all_topics[i])
    }
  }
  return sorted
}

function generate_report() {
  let message = ""
  let child_name = document.getElementById("childname").value
  let parent_name = document.getElementById("parentname").value
  let pronouns = document.querySelector('input[name="pronouns"]:checked').value
  let template_type = document.getElementById("template").value
  let topics_worked = count_non_empty(document.getElementsByClassName("workedskills"))
  let topics_well = sort_topics(topics_worked, document.getElementsByClassName("goodcheck"))
  let topics_practice = sort_topics(topics_worked, document.getElementsByClassName("practicecheck"))
  let topics_worked_msg = make_topic_list(topics_worked)
  let topics_well_msg = make_topic_list(topics_well)
  let topics_practice_msg = make_topic_list(topics_practice)
  var map = {
    STUDENT: child_name,
    PARENT: parent_name,
    HESHE: PRONOUNS[0][pronouns],
    HISHER: PRONOUNS[1][pronouns],
    LISTTOPICS: topics_worked_msg,
    DIDWELL: topics_well_msg,
    TOPRACTICE: topics_practice_msg,
    ADDMATHQUOTE: MATH_SAYINGS[Math.floor(Math.random() * MATH_SAYINGS.length)]
  }
  var re = new RegExp(Object.keys(map).join("|"),"gi");
  console.log(re)
  if (template_type == "first") {
    message = NEW_STUDENT_MSG.replace(re, function(matched){return map[matched];})
  } else if (template_type == "random") {
    message = RANDOM_MSG[Math.floor(Math.random() * RANDOM_MSG.length)].replace(re, function(matched){return map[matched];})
  } else {
    message = RANDOM_MSG[template_type - 1].replace(re, function(matched){return map[matched];})
  }
  document.getElementById("report").innerHTML = message
  document.getElementById("copybutton").value = "Copy Message"
}

function copy_message() {
  let copy_text = document.getElementById("report");
  navigator.clipboard.writeText(copy_text.value)
  document.getElementById("copybutton").value = "Copied!"
}

function reset_form() {
  let form_fields = document.getElementsByClassName("forminput")
  for (let i = 0; i < form_fields.length; i++) {
    form_fields[i].value = ""
  }
}