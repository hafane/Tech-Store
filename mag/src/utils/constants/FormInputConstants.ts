import { InputHTMLAttributes } from "react"
import { RegisterOptions } from "react-hook-form"

export const validateRules = {
	username: {
		required: "Логин обязателен.",
	},
	email: {
		required: "Почта обязательна.",
		pattern: {
			value:
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			message: "Неверный формат почты.",
		},
	},
	registerPassword: {
		required: "Пароль обязателен.",
		pattern: {
			value: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/g,
			message:
				"Пароль должен содержать минимум одну заглавную букву, одну строчную букву, одну цифру и один спецсимвол.",
		},
		minLength: {
			value: 8,
			message: "Минимальная длина пароля 8 символов.",
		},
		maxLength: {
			value: 24,
			message: "Максимальная длина пароля 24 символа.",
		}
	},
	loginPassword: {
		required: "Пароль обязателен.",
	}
}

export const validateOrderRules = {
	customerName: {
		required: "Полное имя обязательно.",
		pattern: {
			value: /(^[а-яА-ЯёЁ]{2,})[ ]([а-яА-ЯёЁ]{3,})[ ]([а-яА-ЯёЁ]{3,})$/,
			message: "Введите полное имя.",
		},
	},
	phoneNumber: {
		required: "Номер телефона обязателен.",
		pattern: {
			value: /^\+7918[0-9]{3}[0-9]{2}[0-9]{2}$/,
			message: "Неверный формат номера телефона. Пример: +79180000000",
		},
	},
	postalCode: {
		required: "Индекс обязателен.",
		pattern: {
			value: /^[0-9]{6}$/,
			message: "Неверный формат индекса. Пример: 123456",
		},
	},
}

//ItemAddModal config
export type TItemAddModalForm = {
	name: string
	price: string
	available: string
	categoryId: string
	brandId: string
	images: File[]
	info: string
}

interface TItemAddModalConfig extends InputHTMLAttributes<HTMLInputElement> {
	title: string
	name:
		| "name"
		| "price"
		| "available"
		| "categoryId"
		| "brandId"
		| "images"
		| "info"
		| `images.${number}`
	validate: RegisterOptions<
		TItemAddModalForm,
		| "name"
		| "price"
		| "available"
		| "categoryId"
		| "brandId"
		| "images"
		| "info"
		| `images.${number}`
	>
}

export const ItemAddModalConfig: TItemAddModalConfig[] = [
	{
		title: "Название товара",
		placeholder: "...",
		name: "name",
		validate: { required: true },
		type: "text",
	},
	{
		title: "Цена",
		placeholder: "...",
		name: "price",
		validate: { required: true },
		type: "number",
	},
	{
		title: "Количество товара",
		placeholder: "...",
		name: "available",
		validate: { required: true },
		type: "number",
	},
	{
		title: "Id бренда",
		placeholder: "...",
		name: "brandId",
		validate: { required: true },
		type: "number",
	},
	{
		title: "Id категории",
		placeholder: "...",
		name: "categoryId",
		validate: { required: true },
		type: "number",
	},
	{
		title: "Изображения товара",
		name: "images",
		validate: { required: true },
		type: "file",
	},
]
