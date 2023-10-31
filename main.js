const mysql = require('mysql2');
const prompt = require("prompt-sync")({ sigint: true });




const connection = mysql.createConnection({
    host: 'localhost',
    user: 'Vitiaok',
    password: '1234567890Mama',
    database: 'vacancies',
    multipleStatements:true
});


connection.connect(function(err) {
  
    if (err) throw err;
    console.log("Ви успішно підключилися до бази даних з вакансіями!\n");

    console.log("Оберіть дію, яку потрібно провести:\n");
    console.log("1.Показати список усіх таблиць бази даних\n"+
        "2.Вивести структуру усіх таблиць\n"+
        "3.Вивести результати запиту, що містить використання псевдонімів стовпців\n"+
        "4.Вивести результати запиту, що містить математичні дії\n"+
        "5.Вивести результати запиту, що містить фільтрацію по певному стовпцю (рівне,більше, належить діапазону)\n"+
        "6.Вивести результати запиту, що містить сортування результату\n"+
        "7.Внесення даних у базу даних\n"+
        "8.Оновлення даних в базі даних\n"+
        "0.Вийти з програми та виконати обрані запити\n"
    );

    var n = prompt("Введіть цифру вашого вибору:");
    
   while(n!=0){
    switch(n){
        case "0":
            break;
        case "1":
            console.log("2167381920");
            connection.execute("SHOW TABLES", function (err, result, fields) {
                    if (err) throw err;
                    console.log("Список усіх таблиць бази даних:\n",result,"\n\n");
            });
            break;
        case "2":
            connection.execute(`DESC lov;`, function (err, result, fields) {
            if (err) throw err;
            console.log("lov:\n",result);
            });
            connection.execute(`DESC pretenders;`, function (err, result, fields) {
                if (err) throw err;
                console.log("pretenders:\n",result);
            });
            connection.execute(`DESC result;`, function (err, result, fields) {
                    if (err) throw err;
                    console.log("result:\n",result,"\n\n");
            });
            break;
        case "3":
            var table = prompt("З якої таблиці взяти стовпець?\t");
            var column = prompt("З якого стовпця взяти дані?\t");
            var p = prompt("Який псевдонім надати стовпцю?\t");
            
            connection.execute(`SELECT ${column} as ${p} from ${table}`, function (err, result, fields) {
                if (err) throw err;
                console.log("Результат запиту з псевдонімом стовпця:\n",result,"\n\n");
            });
            break;
        case "4":
            var table = prompt("З якої таблиці взяти стовпець/стовпці?\t");
            var column = prompt("З якого стовпця/стовпців взяти дані? З останнім введеним стовпцем буде проведено математичну операцію\t");
            var p = prompt("Яку операцію провести? * - множення; / - ділення; + - додавання; - віднімання;\t");
            var p2 = prompt("Який доданок/дільник/множник/від'ємник використати(число)?")

            connection.execute(`SELECT ${column}${p}${p2} from ${table}`, function (err, result, fields) {
                if (err) throw err;
                console.log("Результат запиту з математичними діями:\n",result,"\n\n");
            });
            break;
        case "5":
            var table = prompt("З якої таблиці взяти стовпець/стовпці?\t");
            var column = prompt("З якого стовпця/стовпців взяти дані?\t");
            var column2 = prompt("З яким стовпцем проводити фільтрацію?\t");
            var q = prompt("Яку фільтрацію обираєте?(рівне(1), більше(2), менше(3), знаходиться в діапазоні(4)\t");
            var p = prompt("З яким числом чи стовпцем порівнювати? При фільтрації в діапазоні це значення пов'язане зі знаком більше\t");
            switch(q){
                case "1":
                    connection.execute(`SELECT ${column} from ${table} where ${column2} = ${p} `, function (err, result, fields) {
                        if (err) throw err;
                        console.log("Результат запиту з фільтрацією результату:\n",result,"\n\n");
                    });
                    break; 
                case "2":
                    connection.execute(`SELECT ${column} from ${table} where ${column2} >${p} `, function (err, result, fields) {
                        if (err) throw err;
                        console.log("Результат запиту з фільтрацією результату:\n",result,"\n\n");
                    });
                    break; 
                case "3":
                    connection.execute(`SELECT ${column} from ${table} where ${column2} < ${p} `, function (err, result, fields) {
                        if (err) throw err;
                        console.log("Результат запиту з фільтрацією результату:\n",result,"\n\n");
                    });
                    break; 
                case "4":
                    var p2 = prompt("Друге число з яким потрібно порівнювати(це значення пов'язане зі знаком менше):")
                    connection.execute(`SELECT ${column} from ${table} where ${column2} > ${p} and ${column2} < ${p2}`, function (err, result, fields) {
                        if (err) throw err;
                        console.log("Результат запиту з фільтрацією результату:\n",result,"\n\n");
                    });
                    break; 
                 



            }   
            break;
        case "6":
            var table = prompt("З якої таблиці взяти стовпець/стовпці?\t");
            var column = prompt("З якого стовпця/стовпців взяти дані?\t");
            var column2 = prompt("За яким стовпцем проводити сортування?\t");
            var q = prompt("Сортування по зростанню(1) чи спаданню(2)?")
            switch(q){
                case "1":
                    connection.execute(`SELECT ${column} from ${table} order by ${column2} ASC`, function (err, result, fields) {
                        if (err) throw err;
                        console.log("Результат запиту з cортуванням:\n",result,"\n\n");
                    });
                    break;
                case "2":
                    connection.execute(`SELECT ${column} from ${table} order by ${column2} DESC`, function (err, result, fields) {
                        if (err) throw err;
                        console.log("Результат запиту з cортуванням:\n",result,"\n\n");
                    });
                    break;

            }
        case "7":
            var table = prompt("До якої таблиці додати рядок?\t");
            let statement1="(full_name,job_expirience_in_years,previous_place_of_work,wanted_salary,t1fort2_id)";
            let statement2="(organization_name,adress,phone_number,posada,payment_in_UAH)";
            let statement3="(lov_id,pretenders_id,status)";
            if(table == "pretenders")
            {
                console.log("Columns:(full_name,job_expirience_in_years,previous_place_of_work,wanted_salary,t1fort2_id)");
                var values =prompt("Які значення надати кожному стовпцю?(напишіть через кому)\t");
                connection.execute(`Insert into pretenders${statement1} values (${values})`, function (err, result, fields) {
                    if (err) throw err;
                    console.log("Рядок успішно додано!\n",result,"\n\n");
                });
                
            }
            if(table == "lov"){
                console.log("Columns:(organization_name,adress,phone_number,posada,payment_in_UAH)");
                var values =prompt("Які значення надати кожному стовпцю?(напишіть через кому)\t");
                connection.execute(`Insert into lov${statement2} values (${values})`, function (err, result, fields) {
                    if (err) throw err;
                    console.log("Рядок успішно додано!\n",result,"\n\n");
                });
            }
            if(table == "result"){
                console.log("Columns:(lov_id,pretenders_id,status)");
                var values =prompt("Які значення надати кожному стовпцю?(напишіть через кому)\t");
                connection.execute(`Insert into result${statement3} values (${values})`, function (err, result, fields) {
                    if (err) throw err;
                    console.log("Рядок успішно додано!\n",result,"\n\n");
                });
            }
        case "8":
            var table = prompt("До якої таблиці потрібно застосувати зміни?\t");
            var column1 = prompt("У який стовпець необхідно внести зміни?");
            var value= prompt("Змінене значення:");
            var condition=prompt("Умова для зміни значення(id = якесь число). Введіть це число:");
            if(table == "pretenders")
            {
                connection.execute(`Update pretenders set ${column1}=${value} where t2_id = ${condition} `, function (err, result, fields) {
                    if (err) throw err;
                    console.log("Рядок успішно додано!\n",result,"\n\n");
                });
                
            }
            if(table == "lov"){
                connection.execute(`Update lov set ${column1}=${value} where t1_id = ${condition} `, function (err, result, fields) {
                    if (err) throw err;
                    console.log("Рядок успішно додано!\n",result,"\n\n");
                });
            }
            if(table == "result"){
                connection.execute(`Update result set ${column1}=${value} where t3_id = ${condition} `, function (err, result, fields) {
                    if (err) throw err;
                    console.log("Рядок успішно додано!\n",result,"\n\n");
                });
            }
            


            


           
            
            
            

            

    }   
   
    n = prompt("Введіть цифру вашого вибору:");
    
      
     
    
    
   }
   
   console.log("\n\n\n\n");
  
    
    
});





