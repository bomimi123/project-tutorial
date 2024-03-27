<?
    function alert($mgs) {
        echo " <script type='text/javascript'>alert('$mgs')</script>";
    }
        require_once('database-helper.php');
        $accountList = executeReuslt('SELECT * FROM account');
        $username = $password = '';
        if(!empty($_POST)) {
            $username = getPOST('usernmae');
            $password = getPOST('password');
            foreach($accountList as $account) {
                if($account['username'] == $username) {
                    if($account['password'] == $password) {
                        header('Location: quantri.php?name='.$account['name']);
                        die();
                    }
                }
            }
            alert('Khong co tai khoan');
        }
?>