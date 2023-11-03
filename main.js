const mysql = require('mysql2/promise'); // Use mysql2 with Promises
const prompt = require("prompt-sync")({ sigint: true });

async function main() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'Vitiaok',
        password: '1234567890Mama',
        database: 'vacancies',
        multipleStatements: true
    });

    try {
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
        "9.Вивести таблицю\n"+
        "10.Вивести певні стовпці з таблиці\n"+
        "0.Вийти з програми\n"
        );

        // Your code for getting user input here...
        var n = prompt("Введіть цифру вашого вибору:");
        while (n != 0) {
            switch (n) {
                case "0":
                    break;
                case "1":
                    
                    var [tables] = await connection.execute("SHOW TABLES");
                    console.log("Список усіх таблиць бази даних:\n", tables, "\n\n");
                    break;
                case "2":
                    var [tables] = await connection.execute(`DESC lov;`);
                    console.log("lov:\n",tables, "\n\n");
                    var [tables] = await connection.execute(`DESC pretenders;`);
                    console.log("pretenders:\n",tables,"\n\n");
                    var [tables] = await connection.execute(`DESC result;`);
                    console.log("result:\n",tables,"\n\n");
                    break;
                case "3":
                    var table = prompt("З якої таблиці взяти стовпець?\t");
                    var column = prompt("З якого стовпця взяти дані?\t");
                    var p = prompt("Який псевдонім надати стовпцю?\t");
                        
                    var [tables] = await connection.execute(`SELECT ${column} as ${p} from ${table}`);
                    console.log("Результат запиту з псевдонімом стовпця:\n",tables,"\n\n");
                    break;
                case "4":
                    var table = prompt("З якої таблиці взяти стовпець/стовпці?\t");
                    var column = prompt("З якого стовпця/стовпців взяти дані? З останнім введеним стовпцем буде проведено математичну операцію\t");
                    var p = prompt("Яку операцію провести? * - множення; / - ділення; + - додавання; - віднімання;\t");
                    var p2 = prompt("Який доданок/дільник/множник/від'ємник використати(число)?")
            
                    var [tables]= await connection.execute(`SELECT ${column}${p}${p2} from ${table}`);
                    console.log("Результат запиту з математичними діями:\n",tables,"\n\n");
                    break;
                case "5":
                    var table = prompt("З якої таблиці взяти стовпець/стовпці?\t");
                    var column = prompt("З якого стовпця/стовпців взяти дані?\t");
                    var column2 = prompt("З яким стовпцем проводити фільтрацію?\t");
                    var q = prompt("Яку фільтрацію обираєте?(рівне(1), більше(2), менше(3), знаходиться в діапазоні(4)\t");
                    var p = prompt("З яким числом чи стовпцем порівнювати? При фільтрації в діапазоні це значення пов'язане зі знаком більше. Якщо стовпець - слово, то записуйте його у лапках\t");
                    switch(q){
                        case "1":
                            var [tables] = await connection.execute(`SELECT ${column} from ${table} where ${column2} = ${p} `);
                            console.log("Результат запиту з фільтрацією результату:\n",tables,"\n\n");
                            
                            break; 
                        case "2":
                            var [tables] = await connection.execute(`SELECT ${column} from ${table} where ${column2} >${p} `);
                            console.log("Результат запиту з фільтрацією результату:\n",tables,"\n\n");
                            break; 
                        case "3":
                            var [tables] = await connection.execute(`SELECT ${column} from ${table} where ${column2} < ${p} `);
                            console.log("Результат запиту з фільтрацією результату:\n",tables,"\n\n");
                            break; 
                        case "4":
                            var p2 = prompt("Друге число з яким потрібно порівнювати(це значення пов'язане зі знаком менше):")
                            var [tables] = await connection.execute(`SELECT ${column} from ${table} where ${column2} > ${p} and ${column2} < ${p2}`);
                            console.log("Результат запиту з фільтрацією результату:\n",tables,"\n\n");
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
                            var [tables] = await connection.execute(`SELECT ${column} from ${table} order by ${column2} ASC`);
                            console.log("Результат запиту з cортуванням:\n",tables,"\n\n");
                            break;
                        case "2":
                            var [tables] = await connection.execute(`SELECT ${column} from ${table} order by ${column2} DESC`);
                            console.log("Результат запиту з cортуванням:\n",tables,"\n\n");
                            break;
            
                    }
                    break;
                case "7":
                    var table = prompt("До якої таблиці додати рядок?\t");
                    let statement1="(full_name,job_expirience_in_years,ppow,wanted_posada,wanted_salary,t1fort2_id)";
                    let statement2="(organization_name,adress,phone_number,posada,payment_in_UAH)";
                    let statement3="(lov_id,pretenders_id,status)";
                    if(table == "pretenders")
                    {
                        console.log("Columns:(full_name,job_expirience_in_years,previous_place_of_work,wanted_posada,wanted_salary,t1fort2_id)");
                        var values =prompt("Які значення надати кожному стовпцю?(напишіть через кому)\t");
                        var [tables] = await connection.execute(`Insert into pretenders${statement1} values (${values})`);
                        console.log("Рядок успішно додано!\n",tables,"\n\n");
                       
                            
                    }
                    if(table == "lov"){
                        console.log("Columns:(organization_name,adress,phone_number,posada,payment_in_UAH)");
                        var values =prompt("Які значення надати кожному стовпцю?(напишіть через кому)\t");
                        var [tables] = await connection.execute(`Insert into lov${statement2} values (${values})`);
                        console.log("Рядок успішно додано!\n",tables,"\n\n");
                        
                    }
                    if(table == "result"){
                        console.log("Columns:(lov_id,pretenders_id,status)");
                        var values =prompt("Які значення надати кожному стовпцю?(напишіть через кому)\t");
                        var [tables] = await connection.execute(`Insert into result${statement3} values (${values})`);
                        console.log("Рядок успішно додано!\n",tables,"\n\n");

                    }
                    break;
                case "8":
                    var table = prompt("До якої таблиці потрібно застосувати зміни?\t");
                    var column1 = prompt("У який стовпець необхідно внести зміни?");
                    var value= prompt("Змінене значення:");
                    var condition=prompt("Умова для зміни значення(id = якесь число). Введіть це число:");
                    if(table == "pretenders")
                    {
                        var [tables] = await connection.execute(`Update pretenders set ${column1}=${value} where t2_id = ${condition} `);
                        console.log("Рядок успішно додано!\n",tables,"\n\n");
                            
                    }
                    if(table == "lov"){
                        var [tables] = await connection.execute(`Update lov set ${column1}=${value} where t1_id = ${condition} `);
                        console.log("Рядок успішно додано!\n",tables,"\n\n");
                        
                    }
                    if(table == "result"){
                        var [tables] = await connection.execute(`Update result set ${column1}=${value} where t3_id = ${condition} `);
                        console.log("Рядок успішно додано!\n",tables,"\n\n");
                
                    }
                    break;
                case "9":
                    var table = prompt("Яку таблицю потрібно вивести?\t");
                    var [tables] = await connection.execute(`Select *from ${table}`);
                    console.log(`Таблиця ${table}:`, tables,"\n\n");
                    break;
                case "10":
                    var table = prompt("З якої таблиці вивести стовпці?\t");
                    var columns = prompt("Які стовці необхідно винести?(Написати через кому)\t");
                    var [tables] = await connection.execute(`Select ${columns} from ${table}`);
                    console.log(`Стовпці ${columns} таблиці ${table}:`, tables,"\n\n");

                    
            }

            n = prompt("Введіть цифру вашого вибору: ");
        }
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await connection.end();
    }
}

main();