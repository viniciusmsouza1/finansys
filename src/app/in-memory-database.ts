import { InMemoryDbService }from "angular-in-memory-web-api";
import { Categorie } from './pages/categories/shared/categorie.model';
import { Entry } from './pages/entries/shared/entry.model';

export class InMemoryDatabase implements InMemoryDbService {
    createDb(){
        const categories:Categorie[] = [
            {id: 1, name: "Lazer", description: "Cinema, parques, praia, etc"},
            {id: 2, name: "Casa", description: "Despesas de casa"},
            {id: 3, name: "Recebimentos", description: "Dinheiros recebidos"},

        ]
        const entries:Entry[] = [
            {id: 1, name: 'heineken', categorieId: categories[0].id, categorie: categories[0], paid: true, date: '14/10/2020', amount: '95,00', type: 'expense', description: 'exemplo de despesa'} as Entry,
            {id: 2, name: 'Gás de cozinha', categorieId: categories[1].id, categorie: categories[1], paid: true, date: '14/10/2020', amount: '95,00', type: 'expense', description: 'exemplo de despesa'} as Entry,
            {id: 2, name: 'Freela', categorieId: categories[2].id, categorie: categories[2], paid: true, date: '14/10/2020', amount: '950,00', type: 'renevue', description: 'exemplo de recebimento'} as Entry,
        ]
        return { categories, entries }
    }
}