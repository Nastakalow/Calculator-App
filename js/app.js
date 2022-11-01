$(document).ready(function () {
  let firstStr = "";
  let secondStr = "";
  let displayStr = " ";
  let operator = "";
  let firstNum;
  let secondNum;
  let resultCompute;
  let resultDel;
  let isOperator = false;
  let zeroDivided = false;

  $(".keys-btn").on("click", parseNumber);

  function getFirstNum(num) {
    if (num == "." && !firstStr) {
      firstStr = "0" + num;
      displayStr = firstStr;
    } else if (
      num != "DEL" &&
      num != "RESET" &&
      num != "=" &&
      num != "+" &&
      num != "-" &&
      num != "x" &&
      num != "/"
    ) {
      if (firstStr.length <= 8) {
        firstStr += num;
        displayStr = firstStr;
      }
    }

    $(".display-content h3").html(displayStr);

    return firstStr;
  }

  function getSecondNum(num) {
    if (num == "." && !secondStr) {
      secondStr = "0" + num;
      displayStr = displayStr + "0" + num;
    } else if (
      num != "DEL" &&
      num != "RESET" &&
      num != "=" &&
      num != "+" &&
      num != "-" &&
      num != "x" &&
      num != "/"
    ) {
      if (secondStr.length <= 8) {
        secondStr += num;
        displayStr += num;
      }
    } else if (
      (num == "+" || num == "-" || num == "x" || num == "/") &&
      !secondNum
    ) {
      if (resultCompute && !firstStr) {
        displayStr = resultCompute + num;
      } else {
        displayStr = firstStr + num;
      }
      $(".display-content h3").html(displayStr);
    } else if (num == "DEL") {
      displayStr = resultDel;
    } else {
      showResult(num);
      return;
    }

    $(".display-content h3").html(displayStr);

    return secondStr;
  }

  function showResult(num) {
    if (num == "=") {
      if (resultCompute % 1 != 0 && isRepeatingFloat(resultCompute)) {
        resultCompute = parseFloat(Number(resultCompute).toFixed(5));
      } else if (resultCompute > 999999999) {
        resultCompute = resultCompute.toExponential();
        displayStr = resultCompute;
      } else if (
        resultCompute == 0.30000000000000004 ||
        resultCompute == 0.7999999999999999
      ) {
        resultCompute = parseFloat(Number(resultCompute).toFixed(2));
      }
      firstStr = resultCompute.toString();
      firstNum = resultCompute.toString();
      $(".display-content h3").html(resultCompute);

      resetAll();
    }
  }

  function isRepeatingFloat(result) {
    let count;
    let floatNumber = result - Math.floor(result);
    floatNumber += "";

    for (let i = 0; i < floatNumber.length; i++) {
      count = 0;
      for (let j = i + 1; j < floatNumber.length; j++) {
        if (floatNumber[i] == floatNumber[j]) {
          count++;
        } else if (count < 4) {
          break;
        } else if (count == 4) {
          return true;
        }
      }
    }
    return false;
  }

  function parseNumber() {
    let buttonPressed = $(this).html();
    if (
      (buttonPressed == "+" ||
        buttonPressed == "-" ||
        buttonPressed == "x" ||
        buttonPressed == "/") &&
      firstNum &&
      firstNum.slice(-1) != "."
    ) {
      isOperator = true;
      operator = buttonPressed;
    } else if (buttonPressed == "=" && firstNum && secondNum) {
      resultCompute = computeNumbers(firstNum, secondNum, operator);
    } else if (buttonPressed == "DEL") {
      resultDel = deleteNumber();
    } else if (buttonPressed == "RESET") {
      resetAll();
    }

    setNumbers(buttonPressed);
  }

  function setNumbers(buttonPressed) {
    if (
      !isOperator &&
      buttonPressed != "+" &&
      buttonPressed != "-" &&
      buttonPressed != "x" &&
      buttonPressed != "/" &&
      (buttonPressed != "0" ||
        parseFloat(firstNum) !== 0 ||
        firstStr.includes(".")) &&
      (buttonPressed != "." || !firstStr.includes(".") || !firstStr)
    ) {
      firstNum = getFirstNum(buttonPressed);
    } else if (
      isOperator &&
      (buttonPressed != "0" ||
        parseFloat(secondNum) !== 0 ||
        secondStr.includes(".")) &&
      (buttonPressed != "." || !secondStr.includes(".") || !secondStr)
    ) {
      secondNum = getSecondNum(buttonPressed);
    }
  }

  function computeNumbers(a, b, operator) {
    if (!zeroDivided) {
      if (operator == "+") {
        return parseFloat(a) + parseFloat(b);
      } else if (operator == "-") {
        return parseFloat(a) - parseFloat(b);
      } else if (operator == "x") {
        return parseFloat(a) * parseFloat(b);
      } else if (operator == "/" && b == "0") {
        zeroDivided = true;
        return "can't divide by zero";
      } else {
        return parseFloat(a) / parseFloat(b);
      }
    } else {
      zeroDivided = false;
      return "NaN";
    }
  }

  function deleteNumber() {
    displayStr = displayStr.slice(0, -1);
    if (secondStr) {
      secondStr = secondStr.slice(0, -1);
    } else if (operator) {
      operator = operator.slice(0, -1);
      isOperator = false;
    } else {
      firstStr = firstStr.slice(0, -1);
    }

    if (displayStr.length <= 1) {
      displayStr = "0";
    }

    return displayStr;
  }

  function resetAll() {
    firstStr = "";
    secondStr = "";
    displayStr = "0";
    operator = "";
    firstNum;
    secondNum;
    resultCompute;
    resultDel;
    isOperator = false;
    zeroDivided = false;
  }

  changeTheme();

  function changeTheme() {
    $("#themeOne").change(() => {
      $(document.body).removeClass("theme-two");
      $(document.body).removeClass("theme-three");
    });
    $("#themeTwo").change(() => {
      $(document.body).removeClass("theme-three");
      $(document.body).addClass("theme-two");
    });
    $("#themeThree").change(() => {
      $(document.body).removeClass("theme-two");
      $(document.body).addClass("theme-three");
    });
  }
});
