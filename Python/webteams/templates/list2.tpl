## coding: utf-8
<!DOCTYPE html>
<html>

<head>
    <title>Web-Teams</title>
    <meta charset="UTF-8" />
    <script type="text/javascript" src="/webteams.js"></script>
    <style>
        @import "webteams.css";
     </style>
</head>

<body>
    <% nr_i = 0 %>
    % for key_s in data_o:
    <tr class="customTable"> <br> <% nr_i += 1 %>
        <td>Team ${nr_i}:
            <a href="/edit/${key_s}">bearbeiten</a> <br>
            Name: ${data_o[key_s][0]}, Vorname: ${data_o[key_s][1]}, Matr.-Nr.: ${data_o[key_s][2]} , Semester : ${data_o[key_s][3]} <br>
            Name: ${data_o[key_s][4]}, Vorname: ${data_o[key_s][5]}, Matr.-Nr.: ${data_o[key_s][6]} , Semester : ${data_o[key_s][7]}
        </td>
    </tr>
    % endfor

    <div> <a href="/add">erfassen</a> </div>
    <div> <a href="/">Auf andere Weise darstellen</a> </div>
</body>

</html>