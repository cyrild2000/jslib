function CalendarControl() {
	
	this.date = new Date();
	this.months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"];
	this.maxdays = [31,28,31,30,31,30,31,31,30,31,30,31];
	this.days = ["DI","LU","MA","ME","JE","VE","SA"];

	this.getMonth = function() {
		return this.date.getMonth();
	},

	this.getMonthAsString = function() {
		return this.months[this.getMonth()];
	},

	this.getYear = function() {
		return this.date.getFullYear();
	},

	this.setDate = function(year, month) {
		this.date = new Date(year, month);
	},

	this.getPreviousMonth = function() {
		if(this.date.getMonth() == 0) {
			this.setDate(this.date.getFullYear() - 1, 11);
		} else {
			this.setDate(this.date.getFullYear(), (this.date.getMonth() - 1));
		}
		document.getElementById("month").textContent = this.getMonthAsString() + ' ' + this.date.getFullYear();
		this.tableBody('monthlyview', 'tbody');
		return(this.date.getMonth());
	},

	this.getNextMonth = function() {
		if(this.date.getMonth() == 11) {
			this.setDate(this.date.getFullYear() + 1, 0);
		} else {
			this.setDate(this.date.getFullYear(), (this.date.getMonth() + 1));
		}
		document.getElementById("month").textContent = this.getMonthAsString() + ' ' + this.date.getFullYear();
		this.tableBody('monthlyview', 'tbody');
		return(this.date.getMonth());
	},

	this.tableHeader = function(table) {
		var tapp = document.getElementById(table);
		while(tapp.hasChildNodes()) {
			tapp.removeChild(tapp.lastChild);
		}
		var tr = document.createElement("TR");
		for(var i = 0; i < this.days.length; i++) {
			var td = document.createElement("TD");
			td.style.backgroundColor = "lightgray";
			td.style.border = "1px solid black";
			td.style.textAlign = "center";
			td.style.font = "14px arial,serif";
			var txt = document.createTextNode(this.days[i]);
			td.appendChild(txt);
			tr.appendChild(td);
		}
		tapp.appendChild(tr);

	},

	this.tableBody = function(table, tbody) {
		var table_body = document.getElementById(tbody);
		while(table_body.hasChildNodes()) {
			table_body.removeChild(table_body.lastChild);
		}

		var table = document.getElementById(table);
		var td;
		var tr;
		var child;
		var tmpDate = new Date(this.date.getFullYear(), this.date.getMonth());

		var firstday = tmpDate.getDay();

		var dates = new Array();
		for(var y = 1; y <= this.maxdays[tmpDate.getMonth()]; y++) {
			dates[y] = new Date(this.date.getFullYear(), this.date.getMonth(), y);
		}
		tr = document.createElement("TR");
		table_body.appendChild(tr);
		if(firstday == 0) {	
			for(var i = 1; i <= this.maxdays[tmpDate.getMonth()]; i++) {
				if(i % 7 == 0) {
					td = document.createElement("TD");
					td.style.backgroundColor = "#F5F5F5";
					td.style.border = "1px solid black";
					td.style.textAlign = "center";
					td.id = new Intl.DateTimeFormat("en-GB").format(dates[i]);
					td.onclick = function() { var e = document.getElementById("date_select"); e.value = this.id; document.getElementById("calendar_control").style.visibility = 'hidden'; }
					child = document.createTextNode(i);
					td.appendChild(child);
					tr.appendChild(td);
					tr = document.createElement("TR");
					table_body.appendChild(tr);
				} else if (i % 7 == 0 & i > 7) {
					tr = document.createElement("TR");
					table_body.appendChild(tr);
				} else {
					td = document.createElement("TD");
					td.style.backgroundColor = "#F5F5F5";
					td.style.border = "1px solid black";
					td.style.textAlign = "center";
					child = document.createTextNode(i);
					td.appendChild(child);
					tr.appendChild(td);
				}
			}
		} else {
			for(var i = 1; i <= this.maxdays[tmpDate.getMonth()]; i++) {
				if (i <= firstday) {
					td = document.createElement("TD");
					td.style.backgroundColor = "#F5F5F5";
					//td.style.border = "1px solid black";
					child = document.createTextNode("");
					td.appendChild(child);
					tr.appendChild(td);
				} else if (i % 7 == 0) {
					td = document.createElement("TD");
					td.style.backgroundColor = "#F5F5F5";
					td.style.border = "1px solid black";
					td.style.textAlign = "center";
					child = document.createTextNode(i - firstday);
					td.appendChild(child);
					tr.appendChild(td);
					tr = document.createElement("TR");
					table_body.appendChild(tr);
				} else {
					td = document.createElement("TD");
					td.style.backgroundColor = "#F5F5F5";
					td.style.border = "1px solid black";
					td.style.textAlign = "center";
					child = document.createTextNode(i - firstday);
					td.appendChild(child);
					tr.appendChild(td);
				}
			}
			for(var j = 0; j < firstday; j++) {
				if(i % 7 == 0) {
					td = document.createElement("TD");
					td.style.backgroundColor = "#F5F5F5";
					td.style.border = "1px solid black";
					td.style.textAlign = "center";
					child = document.createTextNode(i - firstday);
					td.appendChild(child);
					tr.appendChild(td);
					tr = document.createElement("TR");
					table_body.appendChild(tr);
				} else {
					td = document.createElement("TD");
					td.style.backgroundColor = "#F5F5F5";
					td.style.border = "1px solid black";
					td.style.textAlign = "center";
					child = document.createTextNode(i - firstday);
					td.appendChild(child);
					tr.appendChild(td);
				}
				i = i + 1;
			}
		}

	},

	this.render = function(idElement) {
		this.date = new Date();
		if(document.getElementById(idElement).style.visibility == "hidden") {
			document.getElementById("month").textContent = this.getMonthAsString() + ' ' + this.getYear();
			this.tableHeader("thead");
			this.tableBody("monthlyview", "tbody");
			document.getElementById(idElement).style.visibility = "visible"
		} else {
			document.getElementById(idElement).style.visibility = "hidden"
		}
	}

}