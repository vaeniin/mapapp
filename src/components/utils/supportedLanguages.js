const fi = {
    tabs: {
        markings: 'Merkinnät',
        groups: 'Ryhmät',
    },
    saveEdit: 'Tallenna muutokset',
    saveNewGroup: 'Lisää uusi ryhmä',
    saveNewMarking: 'Tallenna merkintä',
    markings: {
        title: 'Merkinnän otsikko',
        description: 'Merkinnän kuvaus',
        location: 'Merkinnän sijainti',
        group: 'Ryhmä',
        showOnMap: 'Näytä kartalla',
        editedAt: 'Viimeksi muokattu',
        createdAt: 'Luotu',
        search: 'Hae merkinnöistä',
        detailsTitle: 'Merkinnän tiedot',
    },
    groups: {
        name: 'Ryhmän nimi',
        color: 'Valitse väri',
        add: 'Lisää merkintöjä',
    },
    errors: {
        group: 'Ryhmällä täytyy olla nimi',
        color: 'Varmista värivalinta klikkaamalla ympyrän keskustaa',
        marking: 'Merkinnällä täytyy olla otsikko',
        coords: 'Tarkista koordinaatit',
        saveData: 'Datan tallennus laitteeseen epäonnistui',
        readData: 'Datan luku epäonnistui',
        permission: 'Lupa sijaintitietoihin evättiin',
    },
    filter: 'Näytä kaikki',
};

const en = {
    tabs: {
        markings: 'Markings',
        groups: 'Groups',
    },
    saveEdit: 'Save changes',
    saveNewGroup: 'Add new group',
    saveNewMarking: 'Save marking',
    markings: {
        title: 'Title for marking',
        description: 'Description for marking',
        location: 'Location of marking',
        group: 'Group',
        showOnMap: 'Show on map',
        editedAt: 'Last edited',
        createdAt: 'Created at',
        search: 'Search markings',
        detailsTitle: 'Marking details',
    },
    groups: {
        name: 'Name for group',
        color: 'Choose a color',
        add: 'Add markings',
    },
    errors: {
        group: 'Group has to have a name',
        color: 'Verify color choice by clicking circle\'s center',
        marking: 'Marking has to have a title',
        coords: 'Check coordinates',
        saveData: 'Failed to save the data to the storage',
        readData: 'Failed to read the data from the storage',
        permission: 'Permission to access location was denied',
    },
    filter: 'Show all',
};

export { fi, en };