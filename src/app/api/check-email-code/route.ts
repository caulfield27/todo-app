import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

const emailCods = new Map();

function generateCode() {
    let code = "";
    for (let i = 0; i < 4; i++) {
        code += Math.floor(Math.random() * 10);
    }
    return code;
}


export async function POST(request: NextRequest) {
    const { email, code, type } = await request.json();
    if (type === 'check') {
        const emailCode = emailCods.get(email);
        if (emailCode) {
            if (emailCode === code) {
                emailCods.delete(email);
                return NextResponse.json({ message: "успешео" }, { status: 200 });
            } else {
                return NextResponse.json({ message: "неверный код" }, { status: 409 });
            }
        } else {
            return NextResponse.json({ message: "почта не найдена" }, { status: 400 });
        }
    } else {
        const generatedCode = generateCode()
        emailCods.set(email, generatedCode);
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_SENDER,
                pass: process.env.EMAIL_SENDER_PW
            }
        })
        const mailResponse = await transporter.sendMail({
            from: "ToDo-app",
            to: email,
            subject: "Подтверждение кода",
            html: ` <html>
                        <body>
                            <h2>Никому не сообщайте этот код: ${generatedCode}</h2>
                        </body>
                    </html>`
        })

        if(mailResponse.accepted){
            console.log('mailResponse: ', mailResponse);
            
            return NextResponse.json({message: "успешно"}, {status: 200})
        }else{
            return NextResponse.json({message: "неверныый адресс почты"}, {status: 400})
        }
    }
}