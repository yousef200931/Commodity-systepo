
let Title = document.getElementById('Title');
let price = document.getElementById('price');
let Taxes = document.getElementById('Taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let Total = document.getElementById('Total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create'; 
let tmp;
let datapro = localStorage.product ? JSON.parse(localStorage.product) : [];

function getTotal() {
    if (price.value !== '') {
        let result = (+price.value + +Taxes.value + +ads.value -discount.value);
        Total.innerHTML = result;
        Total.style.backgroundColor = '#040';
    } else {
        Total.innerHTML = '';
        Total.style.backgroundColor = '#a00d02';
    }
}


price.oninput = getTotal;
Taxes.oninput = getTotal;
ads.oninput = getTotal;
discount.oninput = getTotal;

submit.onclick = function () {
    if (Title.value === '' || price.value === '') {
        alert('يرجى إدخال الاسم والسعر.');
        return;
    } else if (Number(price.value) === 0) {
        alert('لا يمكن إدخال قيمة صفر.');
        return;
    } else if (!isNaN(Title.value)) {
        alert('الاسم لا يمكن أن يكون الاسم رقماً.');
        return;
    }else if (count.value >500) {
        alert('لايمكن انشاء اكثر من 500 منتج قد يئدي لائقاف التطبيق');
        return;
    }


    let newpro = {
        Title: Title.value,
        price: price.value,
        Taxes: Taxes.value,
        ads: ads.value,
        discount: discount.value,
        Total: Total.innerHTML,
        count: count.value,
        category: category.value,
    };

    if (mood === 'create') {
        if (newpro.count > 1) {
            for (let i = 0; i < newpro.count; i++) {
                datapro.push({...newpro}); 
            }
        } else {
            datapro.push(newpro);
        }
    } else if (mood === 'update') {
        datapro[tmp] = newpro;
        mood = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';
    }

    localStorage.setItem('product', JSON.stringify(datapro));
    cleandata();
    showdata();
};

function cleandata() {
    Title.value = '';
    price.value = '';
    Taxes.value = '';
    ads.value = '';
    discount.value = '';
    Total.innerHTML = '';
    count.value = '';
    category.value = '';
}

function showdata() {
    getTotal();
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${datapro[i].Title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].Taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].Total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="update(${i})" id="update">Update</button></td>
            <td><button onclick="deletedata(${i})" id="delete">Delete</button></td>
        </tr>`;
    }

    document.getElementById('tbody').innerHTML = table;

    let btndelete = document.getElementById('deleteall');
    if (datapro.length > 0) {
        btndelete.innerHTML = `<button onclick="deleteAll()">Delete All (${datapro.length})</button>`;
    } else {
        btndelete.innerHTML = '';
    }
}

function deletedata(i) {
    if (confirm('هل أنت متأكد أنك تريد حذف هذا العنصر؟')) {
        datapro.splice(i, 1);
        localStorage.product = JSON.stringify(datapro);
        showdata();
    }
}

function deleteAll() {
    datapro = [];
    localStorage.removeItem('product');
    showdata();
}

function update(i) {
    Title.value = datapro[i].Title;
    price.value = datapro[i].price;
    Taxes.value = datapro[i].Taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    getTotal();
    count.style.display = 'none'; 
    category.value = datapro[i].category;
    submit.innerHTML = 'Update'; 
    mood = 'update'; 
    tmp = i; 
    scroll({
        top: 0,
        behavior: 'smooth'
    });
}


showdata();
//search
let searchmood = 'Title';
function getsearchmood(id) {
    let search = document.getElementById('search');
    if (id === 'searchTitle') {
        searchmood = 'Title';
        
    } else {
        searchmood = 'category';
        
    }
    search.placeholder = 'search by'+ searchmood;
    search.focus();
    search.value='';
    showdata()
}

function searchData(value) 
{
    let table ='';
     if (searchmood == 'Title')
        {
         for(let i = 0; i < datapro.length;i++){
            if(datapro[i].Title.includes(value)){
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${datapro[i].Title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].Taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].Total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="update(${i})" id="update">Update</button></td>
                    <td><button onclick="deletedata(${i})" id="delete">Delete</button></td>
                </tr>`;
                
            }
         }

        }
        else{
            for(let i = 0; i < datapro.length;i++){
                if(datapro[i].category.includes(value)){
                    table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${datapro[i].Title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].Taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].Total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick="update(${i})" id="update">Update</button></td>
                        <td><button onclick="deletedata(${i})" id="delete">Delete</button></td>
                    </tr>`;
                    
                }
             }
        }

        document.getElementById('tbody').innerHTML = table;
}