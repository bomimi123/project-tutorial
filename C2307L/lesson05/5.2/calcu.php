<?php
    $a = $b = $cal = $result = "";

    if(isset($_GET['a'])) {
        $a = $_GET['a'];
    }
    
    if(isset($_GET['b'])) {
        $b = $_GET['b'];
    }

    if(isset($_GET['cal'])) {
        $cal = $_GET['cal'];
    }

    if ($a != "" && $b != "" && $cal != "") {
        switch($cal) {
            case '+':
                $result = $a + $b;
                break;
            case '-' :
                $result = $a - $b;
                break;
            case '*':
                $result = $a * $b;
                break;
            case '/':
                $result = $a / $b;
                break;
            case '%':
                $result = $a % $b;
                break;
        }
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculator Online</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
</head>
<body>
<div class="container">
        <form method="get" name="MyForm">
            <input type="text" name="a" id="a" class="a" value="" placeholder="Enter a" style="display: none;">
            <input type="text" name="b" id="b" class="b" placeholder="Enter b" style="display: none;">
            <input type="text" name="cal" id="cal" class="cal" placeholder="Cal" style="display: none;">

            <div class="row mb-2">
                <div class="col"><input type="button" class="btn btn-primary btn-block" value="AC"></div>
                <div class="col"><input type="button" class="btn btn-primary btn-block" value="+/-"></div>
                <div class="col"><input type="button" class="btn btn-primary btn-block" value="%"></div>
                <div class="col"><input type="button" class="btn btn-warning btn-block" value="/"></div>
            </div>

            <div class="row mb-2">
                <div class="col"><input type="button" class="btn btn-light btn-block" value="7"></div>
                <div class="col"><input type="button" class="btn btn-light btn-block" value="8"></div>
                <div class="col"><input type="button" class="btn btn-light btn-block" value="9"></div>
                <div class="col"><input type="button" class="btn btn-warning btn-block" value="*"></div>
            </div>

            <div class="row mb-2">
                <div class="col"><input type="button" class="btn btn-light btn-block" value="4"></div>
                <div class="col"><input type="button" class="btn btn-light btn-block" value="5"></div>
                <div class="col"><input type="button" class="btn btn-light btn-block" value="6"></div>
                <div class="col"><input type="button" class="btn btn-warning btn-block" value="-"></div>
            </div>

            <div class="row mb-2">
                <div class="col"><input type="button" class="btn btn-light btn-block" value="1"></div>
                <div class="col"><input type="button" class="btn btn-light btn-block" value="2"></div>
                <div class="col"><input type="button" class="btn btn-light btn-block" value="3"></div>
                <div class="col"><input type="button" class="btn btn-warning btn-block" value="+"></div>
            </div>

            <div class="row mb-2">
                <div class="col-6"><input type="button" class="btn btn-light btn-block" id="c" value="0"></div>
                <div class="col-3"><input type="button" class="btn btn-light btn-block" value="."></div>
                <div class="col-3"><input type="submit" class="btn btn-warning btn-block" value="="></div>
            </div>

            <input class="form-control mt-3" id="result" type="text" value="<?= $a . $cal . $b . '=' . $result ?>"
                readonly="true">
        </form>
    </div>

    <script src="https://code.jquery.com/jquery-latest.js"></script>
    <script> 
        var a = ""
        var b = ""
        var cal = ""

        $(function () {
            $('.btn').click(function () {
                let v = $(this).val()
                switch (v) {
                    case 'AC':
                        a = ''
                        b = ''
                        cal = ''
                        break;
                    case '+':
                    case '-':
                    case '*':
                    case '/':
                    case '%':
                        cal = v
                        break;
                    case '.':
                    case '0':
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                    case '6':
                    case '7':
                    case '8':
                    case '9':
                        if (cal != "") {
                            b += v;
                            if (b.split('.').length >= 3) {
                                b = parseFloat(b)
                            }
                        } else {
                            a += v;
                            if (a.split('.').length >= 3) {
                                a = parseFloat(a)
                            }
                        }
                        break;
                }

                $('#a').val(a)
                $('#b').val(b)
                $('#cal').val(cal)
                $('#result').val(`${a}${cal}${b}`)
            })
        })
    </script>
</body>
</html>