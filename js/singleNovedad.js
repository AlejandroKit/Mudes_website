const client = contentful.createClient({
    space: 'jkposvghhdwd',
    accessToken: 'u1Zaa-_HtrHrQRMtDoSPWZ7aIKtuBHCeMmv9IAgi_1A'
})

//Con estas 3 líneas de código ya tenemos la URL descodificada y almacenada en la variable ‘url’
let remplaza = /\+/gi;
let url = window.location.href;

function obtener_valor(variable){
    let variable_pos = url.indexOf(variable);

    if (variable_pos != -1){
        return url.substring(variable_pos + variable.length + 1, url.length);
    } else{
        return "NO_ENCONTRADO";
    }
}

let valor = obtener_valor("verinfo");

const d = document,
w = window,
$site = d.getElementById("site"),
$posts = d.getElementById("posts"),
$loader = d.querySelector(".loader"),
$template = d.getElementById("post-template").content,
$fragment = d.createDocumentFragment();

async function getPost(){
    $loader.style.display = "block";
    try{
        const contentful = await client.getEntry(valor);
        let el = contentful;

        let categories = "",
        tags1 = "",
        autores1 = "";
        let categoriasLength = el.fields.categoras.length;
        (categoriasLength > 1)?el.fields.categoras.forEach(categoria =>((el.fields.categoras.indexOf(categoria)<categoriasLength-1)?(categories += ` ${categoria},`):(categories += ` ${categoria}`))):el.fields.categoras.forEach(el=>categories = `${el}`)
        let tagsLength = el.fields.tags.length;
        (tagsLength > 1)?el.fields.tags.forEach(tag =>((el.fields.tags.indexOf(tag)<tagsLength-1)?(tags1 += ` ${tag},`):(tags1 += ` ${tag}`))):el.fields.tags.forEach(el=>tags1 = `${el}`)
        let autoresLength = el.fields.autores.length;
        (autoresLength > 1)?el.fields.autores.forEach(autor =>((el.fields.autores.indexOf(autor)<autoresLength-1)?(autores1 += ` ${autor},`):(autores1 += ` ${autor}`))):el.fields.autores.forEach(el=>autores1 = `${el}`)
        $template.querySelector(".post-image").src = el.fields.foto.fields.file.url;
        $template.querySelector(".post-image").alt = el.fields.title;
        $template.querySelector(".post-title").innerHTML = el.fields.title;
        $template.querySelector(".post-author").innerHTML = `
        <figcaption>By ${autores1} | ${new Date(el.fields.fecha).toLocaleDateString()} | ${tags1} | ${categories}</figcaption>`;
        $template.querySelector(".post-excerpt").innerHTML = el.fields.subttulo;
        $template.querySelector(".post-content").innerHTML = documentToHtmlString(el.fields.textoDeLaNoticia);
        let $clone = d.importNode($template, true);
        $fragment.appendChild($clone);

        $posts.appendChild($fragment);
        $loader.style.display = "none";
    }
    catch (error){
        console.log(error);
        let message = error.statusText || " Ocurrió un error";
        $loader.style.display = "none";
    }
}

d.addEventListener("DOMContentLoaded",e =>{
    getPost();
});
