<html dir="ltr" lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>shopcar_add</title>

    <link rel="stylesheet" href="css/bootstrap-grid-4.5.2.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/theme-dark-blue-1.css">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <script src="https://kit.fontawesome.com/214d519a52.js" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
        integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous">
    </script>
    
    <style>
        body {
            padding: 0px;
        }
        
    </style>

    <script>
        function InsertContent() {
            let form = document.getElementById("form");
            form.action = "shopcar_addsave.php";
            form.submit();
        }
    </script>

</head>
<body>

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        &nbsp&nbsp&nbsp
        <a class="btn btn-info px-5" href="index.php">
            <i class="fa fa-home"></i>
        </a>
        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
        <a class="btn btn-info px-5" href="foodtype.php">
            <i class="fa fa-hamburger"></i>
        </a>
        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
        <a class="btn btn-info px-5" href="shopcar.php">
            <i class="fa fa-shopping-cart"></i>
        </a>
    </nav>

    <?php
        include "db_conn.php";

        // $query = ("SELECT foodID, foodtype.store_number, Name, Price, BusinessHour FROM foodtype, store WHERE foodtype.store_number = store.store_number");
        // $query = ("SELECT * from shopcar");
        // $stmt = $db->prepare($query);
        // $stmt->execute();
        // $result = $stmt->fetchAll();
    ?>

    <div class="container my-5">
        <div class="row">
            <div class="col">
                <!-- <a class="btn btn-info py-2" href="shopcar_add.php">
                    <i class="fa fa-plus"></i>
                </a>
                <p></p> -->
                <form id="form" action="" method="post">
                    <table class="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th scope="col">餐點編號</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <select name="ID" id="ID">
                                        <?php
                                            $query = ("SELECT foodID FROM foodtype EXCEPT SELECT foodID FROM shopcar");
                                            $stmt = $db->prepare($query);
                                            $stmt->execute();
                                            $result = $stmt->fetchAll();
                                            for($i = 0; $i < count($result); ++$i) {
                                                echo "<option value='".$result[$i]['foodID']."'>".$result[$i]['foodID']."</option>";
                                            }
                                        ?>
                                    </select>
                                </td>
                            </tr>
                            

                        </tbody>
                    </table>
                    <button class="btn btn-info py-2" onclick="InsertContent()">
                        <i class="fa fa-plus"></i>
                    </button>
                </form>
                
            </div>
        </div>
    </div>
    
    

</body>
</html>
