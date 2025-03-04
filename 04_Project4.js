// Currency Converter App

import https from "https";
import readline from "readline";
import chalk from "chalk";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const convertCurrency = () =>{
    const url = " https://v6.exchangerate-api.com/v6/7be509ed16ce4da967a97dec/latest/USD";
    rl.question(chalk.bgBlue("\nEnter the amount in USD : "), (amount) => {
        rl.question(chalk.bgBlue("\nEnter the target currency (eg. INR, EUR, NPR..) : "), (country) => {
            https.get(url,(response)=>{
                let data = "";
                response.on("data",(chunks)=>{
                    data += chunks;
                });
                response.on("end",()=>{
                    const rates = JSON.parse(data).conversion_rates;
                    const rate = rates[country];
                    const Convertedcurrency = ((rate*amount).toFixed(2));
                    console.log(chalk.bgBlue(`\n${amount} USD is approximately ${Convertedcurrency} ${country}.\n`)); 
                    rl.close();
                });
                response.on("error",(err)=>{
                    console.log(`Error : ${err.message}`);
                });
            });
        });
    });
};

convertCurrency();
