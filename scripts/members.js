member_group = ['all','daisy','captain','leader','akb48tw','tpeone','formal','sskr','the-puzzle5','tp-chipmunk','wrd48','lemon','mini-four','ghost-family','keeler','soba-star','trainee','ttptwo','metro','bellflower','101girl','sakura','rest','000']
lastUnit = 'ttp'

$(document).ready(function(){
    var url = location.href;
    if (url.indexOf('?') != -1) {
        var gotWord = false;
        var word = "";
        var ary = url.split('?')[1].split('&');
        const aryLength = ary.length;
        for(var i = 0; i < aryLength; i++) {
            if(ary[i].split('=')[0] == 'q') {
                word = decodeURIComponent(ary[i].split('=')[1]);
                gotWord = true;
            }
        }
        if (gotWord) {
            if (member_group.includes(word)) {
                setDropdownLayout(word)
            } else {
                setDropdownLayout('all')
            }
        } else {
            setDropdownLayout('all')
        }
    } else {
        setDropdownLayout('all')
    }

    $('.dropdown-item').on('click',function() {
        var value = this.getAttribute('value')
        var new_url = 'members.html?q=' + value;
        if (value == '' || value == 'all') {
            new_url = 'members.html'
        }
        window.location.href = new_url
    });
});

function setDropdownLayout(word) {
    var selectedItem = $('a[value=' + word + ']')
    var displayName = selectedItem.text()
    $('#dropdownMenu').text(displayName)
    $('.dropdown-item.active').removeClass('active')
    selectedItem.addClass('active')

    $('.btn.btn-' + lastUnit + '-1.dropdown-toggle').removeClass('btn-' + lastUnit + '-1')
    
    if (displayName == 'Unit Daisy' || (MEMBER_INFO[displayName] != undefined && MEMBER_INFO[displayName].indexOf('Daisy') != -1)) {
        $('.btn.dropdown-toggle').addClass('btn-daisy-1')
        lastUnit = 'daisy'
    } else if (displayName == 'Unit Bellflower' || (MEMBER_INFO[displayName] != undefined && MEMBER_INFO[displayName].indexOf('Bellflower') != -1)) {
        $('.btn.dropdown-toggle').addClass('btn-bellflower-1')
        lastUnit = 'bellflower'
    } else if (displayName == 'Unit Sakura' || (MEMBER_INFO[displayName] != undefined && MEMBER_INFO[displayName].indexOf('Sakura') != -1)) {
        $('.btn.dropdown-toggle').addClass('btn-sakura-1')
        lastUnit = 'sakura'
    } else {
        $('.btn.dropdown-toggle').addClass('btn-ttp-1')
        lastUnit = 'ttp'
    }

    setItemVisibility(word)
}

function setItemVisibility(word) {
    var filterWord = word
    if (filterWord == '') {
        filterWord = 'all'
    }
    var memberCount = 0
    $('.card-columns').children().each(function () {
        if (filterWord == 'all') {
            this.style.cssText = '';
            memberCount++
        } else {
            var name = this.getAttribute('name')
            if (name.indexOf(filterWord) != -1) {
                this.style.cssText = '';
                memberCount++
            } else {
                this.style.cssText = 'display: none;';
            }
        }
    });
    $('#member_count').text('共 ' + memberCount + ' 名成員')
    return filterWord
}

function filterTimeline(filterWord) {
    var new_url = 'index.html?q=' + filterWord;
    if (filterWord == '' || filterWord == '所有內容') {
        new_url = 'index.html'
    }
    window.location.href = new_url
}

function filterTimelineIndividual(filterWord) {
    var new_url = 'individual.html?q=' + filterWord;
    if (filterWord == '' || filterWord == '所有內容') {
        new_url = 'individual.html'
    }
    window.location.href = new_url
}