import { Request, Response } from "express";
import { StudentDocument, StudentInput, StudentSearchQuery } from "../models/student.model";
import { studentService } from "../services/student.service";

class StudentController {

    public async getAll(request: Request, response: Response) {
        try {
            const students: StudentDocument[] = await studentService.findAll();
            response.status(200).json(students);

        } catch (error) {
            response.status(500).json(error);
        }
    }

    async create(request: Request, response: Response) {
        try {
            const students = await studentService.create(request.body);
            response.json(students);
        } catch (error) {
            response.json(error);
        }
    }

    async getByEmail(request: Request, response: Response) {
        try {
            const email = request.params.email;
            if (typeof email !== "string") {
                response.status(400).json({ message: "Pon un email valido" });
                return;
            }
            const students = await studentService.findByEmail(email);
            response.json(students);
        } catch (error) {
            response.json(error);
        }
    }

    async updateStudent(request: Request, response: Response) {
        try {
            const email = request.params.email;
            if (typeof email !== "string") {
                response.status(400).json({ message: "Pon un email valido" });
                return;
            }
            const student: StudentDocument | null = await studentService.updateStudent(email, request.body as StudentInput);
            if (student === null) {
                response.status(400).json({ message: `User ${email} not found` });
            }
            response.json(student);
        } catch (error) {
            response.json(error);
        }
    }

    // TODO (Reto 1 - Bulk create): validar que request.body sea un arreglo y delegar en studentService.bulkCreate
    async bulkCreate(request: Request, response: Response) {

        // Extraemos del body los dos campos que esperamos recibir.
        const students = request.body;

        // Validamos que "emails" exista y realmente sea un arreglo.
        if (!Array.isArray(students)) {
            return response.status(400).json({
                message: "request body must be an array"
            });
        }

        // Delegamos la lógica de negocio al service.
        const result = await studentService.bulkCreate(students);

        // Retornamos el resultado al cliente.
        return response.status(200).json(result);

    }

    // TODO (Reto 2 - Search): tomar los query params y delegar en studentService.search
    async search(request: Request, response: Response) {
        try {
            const query = request.query as StudentSearchQuery;
            const students = await studentService.search(query);
            response.status(200).json(students);
        } catch (error) {
            response.status(500).json(error);
        }
    }

    // TODO (Reto 3 - Delete): validar el email y delegar en studentService.deleteStudent (404/mensaje si no existe)
    async deleteStudent(request: Request, response: Response) {
        try {
            const email = request.params.email;
            if (typeof email !== "string") {
                response.status(400).json({ message: "Pon un email valido" });
                return;
            }
            const students = await studentService.findByEmail(email);
            response.json(students);
        } catch (error) {
            response.json(error);
        }
    }
}

export const studentController = new StudentController();