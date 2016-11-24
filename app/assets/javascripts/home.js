$(function() {
    
    var $addMusic = $("#new_music"),
        $musicList = $("#music_list").find("tbody"),
        $deleteMusic = $(".music_delete"),
        $status = $(".status"),
        $noMusic = $(".no_music")
        addAPIPath = $addMusic.attr("action");
        
    var template = "<tr>";
        template += "<td>{{title}}</td>";
        template += "<td>{{artist}}</td>";
        template += "<td>{{year}}</td>";
        template += "<td>{{genre}}</td>";
        template += "<td><a class='music_delete' data-method='delete' href='/musics/{{id}}'>x</a></td>";
        template += "</tr>"
    
    var  manageStatus = function (message, doShow) {
        $status.text(message);
        doShow ? $status.fadeIn(10, "linear") : $status.fadeOut(4000, "linear");
    };
    
    var addSong = function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        
        var song = {
            title: $("#music_title").val(),
            artist: $("#music_artist").val(),
            year: $("#music_year").val(),
            genre: $("#music_genre").val()
        };
        
        var titulo = $("#music_title").val().trim().length;
    	var artista = $("#music_artist").val().trim().length;
    	var year = $("#music_year").val().trim().length;
    	var anio = $("#music_year").val();
    	var genero = $("#music_genre").val().trim().length;
    	var ocultar = $(".ocultar");
    	var status = $("#status");
    	ocultar.hide();
    	var f = new Date();
    	var a = f.getFullYear();
        
        manageStatus("Status: Sending request...", true);
        
        if(titulo == 0 || titulo > 40) {
    	    status.append("<p>Invalid Title</p>");
        }
    	if(artista == 0 || artista > 60) {
    	    status.append("<p>Invalid Artist</p>");
        }
        if(year == 0 || anio < 1900 || anio > a) {
    	    status.append("<p>Invalid Year</p>");
        }
        if(genero == 0 || genero > 30) {
    	    status.append("<p>Invalid Genre</p>");
    	} else {
            $.ajax({
                url: addAPIPath,
                type: 'post',
                dataType: 'json',
                data: song,
                success: function (response) {
                    $musicList.append(template.replace("{{title}}", response.title)
                                              .replace("{{artist}}", response.artist)
                                              .replace("{{year}}", response.year)
                                              .replace("{{genre}}", response.genre)
                                              .replace("{{id}}", response.id));
                                              
                                              
                    manageStatus("Status: OK", false);
                },
                error: function (error) {
                    manageStatus("Status: Request Failed", false);
                }
            });
    	}
        
    };
    
    var deleteSong = function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();

        $.ajax({
            type: "post",
            data: {"_method":"delete"},
            dataType: 'json',
            complete: function() {            
                $(this).parent().parent().remove();
            }
        });
    };
    
    var init = function () {
        $addMusic.submit(addSong);
        $deleteMusic.click(deleteSong);
    };
    
    init();
    
});