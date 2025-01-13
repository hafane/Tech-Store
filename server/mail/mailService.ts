import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: process.env.SMTP_PORT,
	secure: true,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
})

class MailService {
	async sendRegistrationMail(to: string, login: string, activation: boolean) {
		await transporter.sendMail({
			from: process.env.SMTP_USER,
			to: to,
			subject: "Успешная регистрация!",
			text: "",
			html: `
                <div>
                    <h1>Здравствуйте ${to}</h1>
                    <p style={color: 'сornflowerBlue'}>Вами была успешно пройдена регистрация на сайте "MagazobMagaz"!</p>
                    <ul>
                        <h2>Ваш логин и почта, на которые была произведена регистрация:</h2>
                        <li>Почта: ${to}</li>
                        <li>Логин: ${login}</li>
                        <li>Статус активации: ${activation}</li>
                    </ul>
                </div>
            `,
		})
	}

	async sendChangePersonalMail(to: string) {
		await transporter.sendMail({
			from: process.env.SMTP_USER,
			to: to,
			subject: "Данные аккаунта были изменены",
			text: "",
			html: `
                <div>
                    <h1>Здравствуйте ${to}!</h1>
                    <p>Кто-то изменил данные вашего аккаунта на сайте "MagazobMagaz"!</p>
                    <p>Если это были вы, то просто проигнорируйте это письмо.</p>
                    <p>В противном случае, советуем Вам как можно скорее восстановить доступ к аккаунту, или изменить пароль на более надежный.</p>
                </div>
            `,
		})
	}

	async sendActivationMail(to: string, link: string) {
		await transporter.sendMail({
			from: process.env.SMTP_USER,
			to: to,
			subject: "Подтверждение почты.",
			text: "",
			html: `
                <div>
                    <h1>Здравствуйте ${to}</h1>
                    <p>Перейдите по <a href='http://localhost:5000/activate/${link}'>ссылке</a> для подтверждения почты</p>
                </div>
            `,
		})
	}

	async sendOrderMail(to: string, paymentUrl: string) {
		await transporter.sendMail({
			from: process.env.SMTP_USER,
			to: to,
			subject: "Заказ в магазине.",
			text: "",
			html: `
                <div>
                    <h1>Здравствуйте ${to}</h1>
                    <span>Вами был создан заказ в магазине "Tech"</span>
                    <p>Для оплаты перейдите по <a href=${paymentUrl}>этой ссылке</a></p>
                    <p>Если вы не хотите оформлять заказ, то просто проигнорируйте это письмо.</p>
                </div>
            `,
		})
	}

	async sendOrderSuccessMail(
		to: string,
		info: { orderId: number; status: string }
	) {
		await transporter.sendMail({
			from: process.env.SMTP_USER,
			to: to,
			subject: "Ваш заказ успешно оплачен!",
			text: "",
			html: `
                <div>
                    <h1>Здравствуйте ${to}</h1>
                    <p>Ваш заказ №${info.orderId} в магазине "Tech" был успешно оплачен!</p>
                    <a href=http://localhost:3000/profile/orders>Перейти к моим заказам</a>
                </div>
                `,
		})
	}

    async sendOrderCancelledMail(to: string, info: {orderId: number, status: string}) {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: to,
            subject: "Ваш заказ был отменен!",
            text: "",
            html: `
                <div>
                    <h1>Здравствуйте ${to}</h1>
                    <p>Ваш заказ №${info.orderId} в магазине "Tech" был отменен!</p>
                    <a href=http://localhost:3000/profile/orders>Перейти к моим заказам</a>
                </div>
                `,
        })
    }
}

export default new MailService()
