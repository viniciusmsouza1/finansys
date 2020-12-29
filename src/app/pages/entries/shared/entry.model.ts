import { Categorie } from '../../categories/shared/categorie.model';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Entry extends BaseResourceModel{
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public type?: string,
        public amount?: string,
        public date?: string,
        public paid?: boolean,
        public categorieId?: number,
        public categorie?: Categorie
    ){
        super();
    }

    static types = {
        expense: 'Despesa',
        renevue: 'Receita'
    };

    static fromJson(jsonData: any): Entry {
        return Object.assign(new Entry(), jsonData);
    }

    get paidText():string {
        return this.paid ? 'Pago' : 'Pendente'
    }
}