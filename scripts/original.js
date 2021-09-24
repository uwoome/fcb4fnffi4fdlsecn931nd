item_group = ['all','song','dance']

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
            if (item_group.includes(word)) {
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
        var new_url = 'original.html?q=' + value;
        if (value == '' || value == 'all') {
            new_url = 'original.html'
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

    setItemVisibility(word)
}

function setItemVisibility(word) {
    var filterWord = word
    if (filterWord == '') {
        filterWord = 'all'
    }
    var itemCount = 0
    $('.card-columns').children().each(function () {
        if (filterWord == 'all') {
            this.style.cssText = '';
            itemCount++
        } else {
            var name = this.getAttribute('name')
            if (name.indexOf(filterWord) != -1) {
                this.style.cssText = '';
                itemCount++
            } else {
                this.style.cssText = 'display: none;';
            }
        }
    });
    $('#item_count').text('共 ' + itemCount + ' 項創作')
    return filterWord
}