import { EMAIL_PASSWORD } from "./env";
import nodemailer from 'nodemailer'
const transporter=nodemailer.createTranspost({
    service:'gmail',
    auth:{
        user:'jkianreserve@gmail.com',
        pass:EMAIL_PASSWORD
    }
})