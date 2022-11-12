const client = contentful.createClient({
    space: 'jkposvghhdwd',
    accessToken: 'u1Zaa-_HtrHrQRMtDoSPWZ7aIKtuBHCeMmv9IAgi_1A'
})

const d = document,
w = window,
$posts = d.getElementById("posts"),
$postsDesktop = d.getElementById("posts-desktop"),
$loader = d.querySelector(".loader"),
$template = d.getElementById("post-template").content,
$templateDesktop = d.getElementById("post-template-desktop").content,
$fragment = d.createDocumentFragment();

async function getPosts(){
    $loader.style.display = "block";
    try{
        const contentful = await client.getEntries({content_type:'noticia', limit:3});
        let posts = contentful.items;
        if(w.screen.width<1024){
            posts.forEach(el=>{
                $template.querySelector(".post-image").src = el.fields.foto.fields.file.url;
                $template.querySelector(".post-image").alt = el.fields.title;
                $template.querySelector(".post-title").innerHTML = el.fields.title;
                $template.querySelector(".fecha-news").innerHTML = `
                <figcaption>${new Date(el.fields.fecha).toLocaleDateString()}</figcaption>`;
                $template.querySelector(".post-content").innerHTML = `<a href="./pages/singleNovedad.html?verinfo=${el.sys.id}">Leer publicación<i class="fas fa-chevron-right"></i></a>`;
                let $clone = d.importNode($template, true);
                $fragment.appendChild($clone);
            });
            $posts.appendChild($fragment);
            $loader.style.display = "none";
        }
        else{
            posts.forEach(el=>{
                $templateDesktop.querySelector(".post-image").src = el.fields.foto.fields.file.url;
                $templateDesktop.querySelector(".post-image").alt = el.fields.title;
                $templateDesktop.querySelector(".post-title").innerHTML = el.fields.title;
                $templateDesktop.querySelector(".fecha-news").innerHTML = `
                <figcaption>${new Date(el.fields.fecha).toLocaleDateString()}</figcaption>`;
                $templateDesktop.querySelector(".post-content").innerHTML = `<a href="./pages/singleNovedad.html?verinfo=${el.sys.id}">Leer publicación<i class="fas fa-chevron-right"></i></a>`;
                let $clone = d.importNode($templateDesktop, true);
                $fragment.appendChild($clone);
            });
            $postsDesktop.appendChild($fragment);
            $loader.style.display = "none";
        }

    }
    catch (error){
        console.log(error);
        let message = error.statusText || " Ocurrió un error";
        $posts.innerHTML = `<p>Error ${error.status}:${message}</p>`;
        $loader.style.display = "none";
    }
}

d.addEventListener("DOMContentLoaded",e =>{
    getPosts();
});