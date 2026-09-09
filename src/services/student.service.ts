import mongoose from "mongoose";
import { BulkCreateResult, StudentDocument, StudentInput, StudentModel, StudentSearchQuery } from "../models/student.model";

class StudentService {

    async create(studentData: StudentDocument) {
        try {
            const existStudent: StudentDocument | null = await this.findByEmail(studentData.email);
            if (existStudent) return { message: `User ${studentData.email} already exist.` }
            const createStudent: StudentDocument = await StudentModel.create(studentData);
            return createStudent;
        } catch (error) {
            console.log(this.handleError(error));
            throw error;
        }

    }
    async findAll(): Promise<StudentDocument[]> {
        try {
            const students: StudentDocument[] = await StudentModel.find();
            return students;
        } catch (error) {
            console.log(this.handleError(error));
            throw error;
        }
    }
    async findByEmail(email: string) {
        try {
            const students = await StudentModel.findOne({ email });
            return students;
        } catch (error) {
            console.log(this.handleError(error));
            throw error;
        }
    }

    async updateStudent(email: string, student: StudentInput) {
        try {
            const updateStudent: StudentDocument | null = await StudentModel.findOneAndUpdate({ email }, student, { returnOriginal: false });
            return updateStudent;
        } catch (error) {
            console.log(this.handleError(error));
            throw error;
        }
    }

    // TODO (Reto 1 - Bulk create): implementar.
    // Recibe un arreglo de StudentInput. Por cada uno:
    //   - si ya existe un estudiante con ese email (en BD o repetido en el mismo arreglo), agregarlo a "skipped" con un "reason"
    //   - si no existe, crearlo y agregarlo a "created"
    // Un solo estudiante inválido NO debe tumbar el resto del lote: atrapa el error por estudiante, no solo por el arreglo completo.
    async bulkCreate(studentsData: StudentInput[]): Promise<BulkCreateResult> {

        // Array donde guardaremos los emails de los estudiantes
        // que sí fueron creados.
        const created: StudentDocument[] = [];

        // Array donde guardaremos los emails que 
        // fueron omitidos en su creación.
        const skipped: { email: string; reason: string }[] = [];

        for (const stu of studentsData) {

            const studentInput = await this.findByEmail(stu.email);

            // Si findByEmail encontró un estudiante,
            // se pone en skipped.
            if (studentInput != null) {

                let email: string = studentInput.email;
                let reason: string = "email already exists";
                const skipped_email: { email: string; reason: string } = {
                    email: email,
                    reason: reason
                };

                skipped.push(skipped_email);

            } else {

                const createdStu = await StudentModel.create(stu as StudentDocument);
                created.push(createdStu);

            }
        }

        return {
            created,
            skipped
        };


    }

    // TODO (Reto 2 - Search): implementar.
    // Construye un filtro de Mongoose SOLO con los criterios presentes en el query (los ausentes no deben filtrar nada).
    // isActive: "true"/"false" -> boolean | minAge/maxAge -> rango con $gte/$lte sobre "age" | name -> coincidencia parcial case-insensitive con $regex
    async search(query: StudentSearchQuery): Promise<StudentDocument[]> {
        try {
            const filter: any = {};


            if (query.isActive !== undefined) {

                filter.isActive = query.isActive === "true";
            }

            if (query.minAge || query.maxAge) {
                filter.age = {
                    $gt: query.minAge,
                    $lt: query.maxAge
                }
            }

            if (query.name) {

                filter.name = {
                    $regex: query.name,
                    $options: "i"
                };
            }

            // Buscamos todos los estudiantes que cumplan el filtro.
            const students = await StudentModel.find(filter);

            return students;

        } catch (error) {
            console.log(this.handleError(error));
            throw error;
        }
    }


    // TODO (Reto 3 - Delete): implementar.
    // Debe eliminar el estudiante con ese email y devolver el documento eliminado, o null si no existía.
    async deleteStudent(email: string): Promise<StudentDocument | null> {
        try {
            
            return await StudentModel.deleteOne(this.findByEmail(email)) as mongoose.Document{};

        } catch (error) {
           return error;
        }
    }

    handleError(error: any) {
        return {
            status: 404,
            error: error
        }
    }
}

export const studentService = new StudentService();