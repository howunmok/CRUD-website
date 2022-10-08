/*  
    Student Name: Ho Wun Mok
    Student No.: 301237442
    Date:   October 8, 2022
    Filename: tablejs.js
*/
function createTable()
{
    var num_rows = document.getElementById('rows').value;
    var num_cols = document.getElementById('cols').value;
    var theader = '<table border="1">\n';
    var tbody = '';

    for( var i=1; i<=num_rows;i++)
    {
        tbody += '<tr>';
        for( var j=1; j<=num_cols;j++)
            {
                tbody += '<td>';
                tbody += i + ',' + j;
                tbody += '</td>'
            }
        tbody += '</tr>\n';
    }
    var tfooter = '</table>';
    document.getElementById('wrapper').innerHTML = theader + tbody + tfooter;
}