/* E2E TESTING FOR SITECATALOG */

describe('SITECATALOG', function() {
	beforeEach(function() {
		browser.get('http://test.sitecatalog.org/');
	});

	afterEach(function() {
		console.log('After each method executed');
	});

	it('should be correct page', function() {
		expect(browser.getCurrentUrl()).toEqual('http://test.sitecatalog.org/');
	});

	it('should check HHS.gov link', function() {
	  element(by.id('landing-footer'));

	  element.all(by.css('a')).then(function(items) {
			expect(items.length).toBe(11);
		  expect(items[5].getText()).toBe('HHS.gov');
		  expect(items[5].getAttribute('href')).toEqual('http://www.hhs.gov/');
		});
	});

	it('should check NIH.gov link', function() {
			element.all(by.css('a')).then(function(items) {
		  	expect(items.length).toBe(11);
		  	expect(items[6].getText()).toBe('NIH.gov');
		  	expect(items[6].getAttribute('href')).toEqual('https://www.nih.gov/');
			});
		});

	it('should check NIAID link', function() {
		element.all(by.css('a')).then(function(items) {
		  expect(items.length).toBe(11);
		  expect(items[7].getText()).toBe('NIAID.gov');
		  expect(items[7].getAttribute('href')).toEqual('https://www.niaid.nih.gov/Pages/default.aspx');
		});
	});

	it('should check add web policies link', function() {
		element.all(by.css('a')).then(function(items) {
		  expect(items.length).toBe(11);
		  expect(items[8].getText()).toBe('USA.gov');
		  expect(items[8].getAttribute('href')).toEqual('https://www.usa.gov/');
		});
	});

	it('should check Institutional Review Board', function() {
		browser.get('http://test.sitecatalog.org/profile/ACSA%20CRS');

		element.all(by.css('a')).then(function(items) {
		  expect(items[8].getText()).toBe('Population Characteristics');
		});
	});

	it('should check 404', function() {
		browser.get('http://test.sitecatalog.org/f');
		expect(browser.getCurrentUrl()).toEqual('http://test.sitecatalog.org/404');
	});

	it('should check for links to plugins for non html files', function() {
		browser.get('http://test.sitecatalog.org/');
	});

	it('should check HANC link', function() {
		browser.get('http://test.sitecatalog.org/about');
		expect(element(by.id('hanc_row')).isPresent()).toBe(true);
		element.all(by.id('hanc_row')).click();
	});

	it('should check HANC link', function() {
		browser.get('http://test.sitecatalog.org/tutorial');
		expect(element(by.id('panel_tut')).isPresent()).toBe(true);
		element.all(by.id('panel_tut')).click();

		expect(element(by.id('panel_about_text')).isPresent()).toBe(true);
		element.all(by.id('panel_about_text')).click();
	});

	it("should check the pdf link", function () {
		browser.get('http://test.sitecatalog.org/tutorial');
		expect(element(by.id('pdfLink')).isPresent()).toBe(true);
		element.all(by.id('pdfLink')).click();
	});

	it('should check excel popup', function() {
		element.all(by.css('a')).then(function(items) {
		  items[0].click();
		  browser.waitForAngular();

			element.all(by.css('a')).then(function(items) {
				expect(items.length).toBe(515);
			  expect(items[3].getAttribute("alt")).not.toEqual('Excel Download');
			});
		});
	});

	it('should check Alabama CRS Profile', function() {
		browser.get('http://test.sitecatalog.org/profile/Alabama%20CRS');
		browser.waitForAngular();

		element.all(by.css('a')).then(function(items) {
		  expect(items.length).toBe(197);
		});

		element.all(by.css('a')).then(function(items) {
		 	expect(typeof items[3].getAttribute("alt")).toBe('object');
		});
	});

	it('should check Beijing Labs', function() {
		browser.get('http://test.sitecatalog.org/labs/Beijing%20Capital%20Medical%20University%20(BCMU)%20CRS');
		browser.waitForAngular();

		element.all(by.css('a')).then(function(items) {
		  expect(items.length).toBe(206);
		});
	});

	it('should check Ponce Epi', function() {
		browser.get('http://test.sitecatalog.org/epi/The%20Ponce%20de%20Leon%20Center%20CRS');
		browser.waitForAngular();

		element.all(by.css('a')).then(function(items) {
		  expect(items.length).toBe(182);
		});
	});

	it('should check removed under construction', function() {
		browser.get('http://test.sitecatalog.org/');

		element.all(by.css('.constNotice')).then(function(items) {
			expect(items.length).toBe(1);
		});
	});

});
