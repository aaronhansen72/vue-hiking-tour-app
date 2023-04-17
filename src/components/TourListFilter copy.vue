<template>
     <div>
    <div>
        <ul class="hnx-tabnav">
            <li class="tab active"><a href="#" @click="filterTourlist(tourlist)">Gesamt</a>
            </li>
            <li class="tab"><a href="#news" @click="openTabnavDropdown(1)">Jahr</a>
                <ul class="dropdown" v-bind:class="{'open': activeDropdown === 1}">
                    <li v-for="year in years" :key="year">
                        <a href="#" @click="filterTourlist(tourlist, 'jahr',year)">{{ year }}</a>
                    </li>
                </ul>
            </li>
            <li class="tab"><a href="#contact" @click="openTabnavDropdown(2)">Land</a>
                <ul class="dropdown" v-bind:class="{'open': activeDropdown === 2}">
                    <li v-for="country in countries" :key="country">
                        <a href="#" @click="filterTourlist(tourlist, 'land',country)">{{ country }}</a>
                    </li>
                </ul>
            </li>
            <li class="tab"><a href="#contact" @click="openTabnavDropdown(3)">Kategorie</a>
                <ul class="dropdown" v-bind:class="{'open': activeDropdown === 3}">
                    <li><a href="#" @click="filterTourlist(tourlist, 'category','Winterwanderung')">Winterwanderung</a></li>
                </ul>
            </li>
        </ul>    
    </div>
    <div class="col-center mt-3 mb-3"><span class="list-category">filter = {{ currentFilter }}</span></div>
   </div>
   
</template>

<script>


export default {
    name: "TourListFilter",
    props: [ "tourlist" ],    
    data: function () {
        return {
            // activeTab: 'Jahr',
            // position: 'is-right',
            activeDropdown: -1,
            countries: [ 'Deutschland','Schweiz','Italien', 'Spanien','Norwegen','Slowenien'],
            years: ['2022','2021','2020','2019','2017','2015','2014'],
            currentFilter: ''
        }
    },      
    methods: {
        filterTourlist (_tourlist, filterKey, filterValue)  {
            console.log("filterTourlist " + filterKey + " = " + filterValue );
            let newArray = _tourlist.filter(function( currentObject) {
                switch (filterKey) {
                    case "land":
                        return currentObject.land == filterValue;
                    case "jahr":
                        return currentObject.id.substring(0,4) == filterValue;
                    case "category":
                        return currentObject.category == filterValue;                        
                    default:
                        return currentObject;
                        //break;
                }
            })
            this.$emit('filtered-tours', newArray);
            this.$emit('reset-start-item-index');
            this.activeDropdown = -1;
            this.currentFilter = filterValue;
        },
        openTabnavDropdown(index) {
            console.log("OPEN", this.$el);
            // Tabnav Item active setzen
            // dropdown muss aufklappen
            this.activeDropdown = index;
        },
        closeAllDropdowns (e) {
            if (!this.$el.contains(e.target)) {
                this.activeDropdown = -1;
            }
        }
    },
    created() {
        document.addEventListener('click', this.closeAllDropdowns);
    }, 
    beforeUnmount () {
        document.removeEventListener('click',this.closeAllDropdowns);
    }   
};
</script>

<style scoped>

ul.hnx-tabnav {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #cfcccc;
}

.hnx-tabnav > li {
  float: left;
  background-color: rgb(180, 184, 184);
}

.hnx-tabnav > li a {
  display: block;
  color: rgb(7, 7, 7);
  text-align: center;
  padding: 16px;
  text-decoration: none;
  border-bottom: 3px solid rgb(245, 209, 8);   
}

.hnx-tabnav > li a:hover {
  background-color: #e9e9e987;
}

.hnx-tabnav .active {
	background-color: #bf1d1d87;
    border-bottom-color: transparent;
   

}

.hnx-tabnav .dropdown {
    position: absolute;
    display: none;
    visibility: visible;
    opacity: 1;
    list-style-type: none;
    background-color: beige;
    border-left: 3px solid #00883a;
    border-bottom: 3px solid #00883a;
    border-right: 3px solid #00883a;
    min-width: 160px;
    max-height: 370px;
    z-index: 1000;
}

.hnx-tabnav .dropdown.open {
    display:block;
}
 

</style>