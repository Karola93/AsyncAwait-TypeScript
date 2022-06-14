interface Companies {
    name:string;
    uri: string;
}

interface Users {
    name: string;
    company: string;
}

const createTable = async (listOfCompanies: Companies[], usersArray: Users[]) => {

    const table = document.getElementById('table');
    let i = 0;

    for (const company of listOfCompanies) {

        const tr = document.createElement('tr');
        tr.innerHTML = `<td class="firstTd">
                        <ul>
                            <li>${company.name}</li>
                        </ul>
                    </td>
                    <td class="td">
                        <ol class="users">
                        </ol>
                    </td>`
        const filterUsersOfCompany = usersArray.filter( user => user.company === company.uri);

        const tmpUsers = document.getElementsByClassName('users');
        for (const filterElement of filterUsersOfCompany) {
            const usersOfCompanyList = tmpUsers[i];
            const companyUser = document.createElement('li');
            companyUser.innerHTML = `${filterElement.name}`
            usersOfCompanyList.appendChild(companyUser);
        }
        i++

        table.appendChild(tr);

    }
}

(async () => {

    const companiesResponse = await fetch('http://localhost:3000/companies/');
    const companiesList = await companiesResponse.json();

    const usersResponse = await fetch('http://localhost:3000/users/');
    const usersList = await usersResponse.json();
    const usersCompany = [];

    for (const user of usersList) {
        const {company} = user.uris;
        const {name} = user;
        usersCompany.push({name, company});
    }

    await createTable(companiesList, usersCompany);

})();