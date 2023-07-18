jQuery(document).ready(function($) {
    var allProducts = [];
    var hasFrequency = false;
    var code = null,
        amount = 0,
        duration = null,
        minimumAmountInvest = 0;

    // GET PRODUCT CATEGORIES FUNCTION
    const getProductCategories = async () => {
        let url =
            "https://api.oxfordvest.com/api/v1.0/AvailableInvestmentCategory/getAvailableInvestmentsCategories";
        let data = {
            AppId: "001",
            RequestId: "XGDGFCGVBHN",
        };

        let result = await axios.post(url, data);

        try {
            let categories = result.data.data;
            let output = "";

            categories.forEach((category, index) => {
                if (category.code == "oig_ng_shares") {
                    return;
                }
                output += `<a class="toggle_items ${index == 0 &&
                    "active_element"}" data-value="${
                    index == 0 ? "all" : category.code
                }">${index == 0 ? "all" : category.name}</a>`;
            });

            // let exempt = categories.find(({ code }) => code == 'oig_ng_shares');
            // console.log('Exempt', exempt);

            // let remove = categories.slice((category) => category.code !== exempt);

            // console.log('remove', remove);

            // console.log('CATEGORIES', categories);

            document.getElementById("toggle_contents").innerHTML = output;

            // console.log(result);
        } catch (error) {
            console.log(error);
        }
    };

    // GET ALL PRODUCTS FUNCTION
    function getAllProducts() {
        let url =
            "https://api.oxfordvest.com/api/v1.0/AvailableInvestment/getAllAvailableInvestments";

        let data = {
            AppId: "001",
            RequestId: "kjhgfdfg",
        };

        axios
            .post(url, data)
            .then((response) => {
                let products = response.data.data;

                // [...allProducts, ...products];
                allProducts = products;

                if (products.length > 0) {
                    $(".product_wrapper").show();
                    $(".product_loading").hide();

                    productsByAgrovest(products);
                    productsByBuildvest(products);
                    // productsByRealvest(products);
                    productsByOilvest(products);
                    productsByKiddiesvest(products);
                    productsByMortgagevest(products);
                    productsByHomevest(products);
                    productsByCropFarming(products);
                    // productsByOigNgShares(products);
                    // console.log(allProducts);

                    checkIfDataExists("kiddiesvest");
                    checkIfDataExists("buildvest");
                    checkIfDataExists("mortgagevest");
                    checkIfDataExists("oilvest");
                    checkIfDataExists("agrovest");
                    checkIfDataExists("homevest");
                    checkIfDataExists("crop_farming");
                    // checkIfDataExists('oig_ng_shares');
                }
            })
            .catch((error) => console.log(error));
    }

    // Agrovest Products
    function productsByAgrovest(products) {
        let payload = {
            products: products,
            searchWord: "Agrovest",
            id: "portfolio_container1",
        };
        getAllTemplate(payload);
    }

    // Buildvest Products
    function productsByBuildvest(products) {
        let payload = {
            products: products,
            searchWord: "Buildvest",
            id: "portfolio_container2",
        };
        getAllTemplate(payload);
    }

    // Kiddiesvest Products
    function productsByKiddiesvest(products) {
        let payload = {
            products: products,
            searchWord: "Kiddiesvest",
            id: "portfolio_container3",
        };
        getAllTemplate(payload);
    }

    // Realvest Products
    // function productsByRealvest(products) {
    //   let payload = {
    //     products: products,
    //     searchWord: "Realvest",
    //     id: "portfolio_container4",
    //   };
    //   getAllTemplate(payload);
    // }

    // Oilvest Products
    function productsByOilvest(products) {
        let payload = {
            products: products,
            searchWord: "Oilvest",
            id: "portfolio_container5",
        };
        getAllTemplate(payload);
    }

    // Mortgagevest Products
    function productsByMortgagevest(products) {
        let payload = {
            products: products,
            searchWord: "Mortgagevest",
            id: "portfolio_container6",
        };
        getAllTemplate(payload);
    }

    // Homevest Products
    function productsByHomevest(products) {
        let payload = {
            products: products,
            searchWord: "Homevest",
            id: "portfolio_container7",
        };
        getAllTemplate(payload);
    }

    function productsByCropFarming(products) {
        let payload = {
            products: products,
            searchWord: "crop_farming",
            id: "portfolio_container9",
        };
        getAllTemplate(payload);
    }

    // OIG NG Shares Products
    // function productsByOigNgShares(products) {
    //   let payload = {
    //     products: products,
    //     searchWord: 'oig_ng_shares',
    //     id: 'portfolio_container8',
    //   };
    //   getAllTemplate(payload);
    // }

    // PRODUCTS CAROUSEL
    const productCarousel = (id) => {
        $(id).owlCarousel({
            loop: true,
            margin: 20,
            stagePadding: 40,
            nav: true,
            autoplay: true,
            autoplayTimeout: 3500,
            responsive: {
                0: {
                    items: 1,
                },
                760: {
                    items: 2,
                },
                880: {
                    items: 3,
                },
                1000: {
                    items: 4,
                },
            },
        });
    };

    getProductCategories();
    getAllProducts();

    // TEMPLATE FUNCTION FOR ADDING NEW PRODUCTS FROM DATABASE
    const getAllTemplate = (payload) => {
        let searchWord = payload.searchWord;

        let products = payload.products.filter((product) => {
            return (
                product.availableInvestmentCategoryCode.toLowerCase() ==
                searchWord.toLowerCase()
            );
        });

        let output = "";

        if (products.length > 0) {
            products.forEach((product) => {
                output += `
                <div class="service-block product-block filter animated">
                    <div class="inner-box">
                        <div class="icon-box">
                        <img
                            src="${product.imageURL}"
                        />
                        </div>
                        <h5><a href="javascript:void(0)">${product.name}</a></h5>
                        <div class="text">
                        <span class="title">${product.newInterestRate}% interest</span> <br />
                        <span>at ${product.duration} months maturity</span>
                        </div>
                        <div>
                        <a class="invest" href="https://dashboard.oxfordvest.com/login">Invest Now</a>
                        <a class="calculator" data-code="${product.code}" data-duration="${product.duration}" data-frequency="${product.frequency}" data-frequencyDurations="${product.frequencyDurations}">Calculator</a>
                        </div>
                    </div>
                </div>
            `;
            });
            document.getElementById(payload.id).innerHTML = output;

            productCarousel("#" + payload.id);
        } else {
            output += `
        <div class="row mt-5">
            <div class="col-md-8 mx-auto">
                <div class="card p-5">
                    <div class="card-body" style="text-align: center;">
                        <div class="text-center">${payload.searchWord} products coming soon</div>
                    </div>
                </div>
            </div>
        </div>
        `;

            $("#" + payload.id).removeClass("owl-carousel owl-theme");

            document.getElementById(payload.id).innerHTML = output;
        }
    };

    // MODAL FOR CALCULATING INVESTMENT ROI
    $("#inner_product_container").on("click", ".calculator", (event) => {
        $("#calculated_result_table").hide();
        $(".modal-title").html("Calculate Investment ROI");
        $("#form").show();
        $("#calculate_investment_btn").prop("disabled", true);
        code = event.target.attributes[1].nodeValue;

        let products = allProducts.find((product) => {
            return product.code.toLowerCase() == code.toLowerCase();
        });

        $("#product_name").val(products.name);
        $("#product_amount").val("");

        code = products.code;
        duration = products.duration;
        minimumAmountInvest = products.minimumAmount;

        $("#min_amount").html(
            `<strong>NOTE:</strong> The Minimum Amount You Can Invest is ₦` +
                products.minimumAmount
        );

        if (products.frequencyDurations.length > 0) {
            let output;
            products.frequencyDurations.forEach((frequency, index) => {
                output += `<option ${index === 0 &&
                    'selected="selected"'}  value="${frequency.code}">${
                    frequency.name
                }</option>`;
            });

            duration = products.frequencyDurations[0].code;
            document.querySelector("#product_duration").innerHTML = output;
            $("#product_frequency").show();

            hasFrequency = true;
        } else {
            $("#product_frequency").hide();
            document.querySelector("#product_duration").innerHTML = "";
            hasFrequency = false;
            duration = products.duration;
            //   console.log(duration);
        }

        // console.log(code);

        $("#productCalculatorModal").modal("show");
    });

    // Close Modal
    $(".close span").on("click", () => {
        $("#productCalculatorModal").modal("hide");
        $("#product_frequency").hide();
        document.querySelector("#product_duration").innerHTML = "";
        hasFrequency = false;
    });

    $("#product_duration").change((event) => {
        duration = event.target.value;

        // console.log(duration);
    });

    // Validation to disable button
    $("#product_amount").keyup((event) => {
        amount = event.target.value;
        if (event.target.value < minimumAmountInvest) {
            $("#calculate_investment_btn").prop("disabled", true);
        } else {
            $("#calculate_investment_btn").prop("disabled", false);
        }

        // duration = event.target.value;

        // console.log(duration);
        // console.log(minimumAmountInvest);
        // console.log(event.target.value);
    });

    // TO CALCULATE ROI
    $("#calculate_investment_btn").on("click", () => {
        $("#button_spinner").show();
        $("#calculate_investment_btn").prop("disabled", true);
        let url =
            "https://api.oxfordvest.com/api/v1.0/AvailableInvestment/CalculateROI";

        var data = {
            Code: code,
            Amount: amount,
            NumberOfDurationInWeeks: duration,
            DurationOfInvestment: duration,
        };

        // console.log(data);

        axios
            .post(url, data)
            .then((response) => {
                let investment = response.data.data;
                let resultOutput = `<tr>
                    <td>${investment.name}</td>
                    <td>${investment.currency}</td>
                    <td>${investment.durationInMonths} Months</td>
                    <td>${investment.interestRate}</td>
                    <td>₦${investment.principal}</td>
                    <td>${investment.interestRateAmountAfterCharges}</td>
                  </tr>`;

                document.getElementById("table_body").innerHTML = resultOutput;
                $("#total_cal").html(investment.total);
                $("#invest_message").html(investment.message);
                $("#invest_frequency").html(investment.frequencyInformation);
                $("#button_spinner").hide();
                $("#calculated_result_table").show();
                $(".modal-title").html(
                    `<i class="fa fa-long-arrow-right mr-2"></i>Result`
                );
                $("#form").hide();
            })
            .catch((error) => console.log(error));
    });

    $("#toggle_contents").on("click", ".toggle_items", function(e) {
        e.preventDefault();

        if ($(this).hasClass("active_element")) {
            return;
        } else {
            $(".toggle_items").removeClass("active_element");
            $(this).addClass("active_element");

            let category = $(this).attr("data-value");

            if (category == "all") {
                $(".carousel_container")
                    .fadeIn("slow")
                    .show();

                checkIfDataExists("kiddiesvest");
                checkIfDataExists("buildvest");
                checkIfDataExists("mortgagevest");
                checkIfDataExists("oilvest");
                checkIfDataExists("agrovest");
                checkIfDataExists("homevest");
                checkIfDataExists("crop_farming");
                // checkIfDataExists('oig_ng_shares');
            } else {
                $(".carousel_container")
                    .fadeOut("slow")
                    .hide();
                $(".carousel_container." + category)
                    .fadeIn("slow")
                    .show();
            }
        }
    });

    const checkIfDataExists = (classToCheck) => {
        let products = allProducts.filter((product) => {
            return (
                product.availableInvestmentCategoryCode.toLowerCase() ==
                classToCheck
            );
        });
        if (products.length <= 0) {
            $(".carousel_container." + classToCheck).hide();
        }
    };
});
