"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(formData: FormData) {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    try {
        const { data, error } = await resend.emails.send({
            from: "ErikarTech Contact <onboarding@resend.dev>",
            to: ["arturosojovivas@gmail.com"],
            subject: `Nuevo mensaje de ErikarTech: ${subject}`,
            replyTo: email,
            html: `
        <h2>Nuevo contacto desde la Landing Page</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
        })

        if (error) {
            console.error("Error sending email:", error)
            return { success: false, error: "No se pudo enviar el correo." }
        }

        return { success: true }
    } catch (err) {
        console.error("Error in sendEmail action:", err)
        return { success: false, error: "Error inesperado al enviar el correo." }
    }
}
