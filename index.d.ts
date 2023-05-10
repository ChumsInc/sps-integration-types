export interface SPSBaseCustomer {
    ARDivisionNo: string;
    CustomerNo: string;
    CustomerName?: string;
}

export interface SPSCustomerKey extends SPSBaseCustomer {
    Company: string;
}

export interface SPSSalesOrder extends SPSCustomerKey {
    CustomerPONo: string;
    ShipExpireDate: string;
    CancelDate: string;
    ShipToCode: string;
    WarehouseCode: string;
    zeroCommissions?: boolean;
    BillToAddress?: SPSCustomerBillingAddress | null;
    DropShip?: boolean;
    ShipToAddress?: SPSCustomerShipToAddress | null;
    CarrierCode?: string | null;
    ShipVia?: string | null;
    detail: SPSSalesOrderDetailLine[];
    comments?: string[];
    SalespersonDivisionNo?: string;
    SalespersonNo?: string;
}

export interface SPSSalesOrderDetailLine {
    VendorStyle: string;
    ItemCode: string | null;
    ItemCodeDesc: string | null;
    QuantityOrdered: number;
    UnitOfMeasure: string;
    UnitPrice: number;
    CommentText: string;
    UDF_SHIP_CODE: string | null;
    errors: string[];
    csv?: SPSOrderLine;
    map?: SPSValueMap;
}

export interface SPSOrderLine {
    [key: string]: string;
}

export interface SPSCustomerMapField {
    field: string;
    value: string;
}

export interface SPSCustomerOptions {
    zeroCommissions?: boolean;
}

export interface SPSCustomerMap extends SPSCustomerKey {
    id: number;
    CustomerName: string;
    LookupFields: SPSCustomerMapField[]
    LookupValue: unknown[] | null;
    options: SPSCustomerOptions;
}

export interface SPSCustomerMapRow
    extends Omit<SPSCustomerMap, 'LookupFields' | 'LookupValue' | 'options'> {
    LookupFields: string | null;
    LookupValue: string | null;
    options: string | null;
}

export interface SPSCustomerValueOptions {
    add?: number;
    conversionFactor?: number;
    UOMOverride?: string;

}

export type OrderMapField = 'ShipExpireDate' | 'CancelDate' | 'ShipToCode' | 'ShipVia' | 'ItemCode';

export interface SPSValueMap {
    id: number;
    MapField: OrderMapField;
    CSVField: string;
    CustomerValue: string;
    MappedValue: string | null;
    MappedOptions: SPSCustomerValueOptions | null;
}

export interface SPSValueMapRow
    extends Omit<SPSValueMap, 'MappedOptions'> {
}

export interface SPSItemUnit {
    ItemCode: string;
    ItemCodeDesc: string;
    SalesUnitOfMeasure: string;
    SalesUMConvFctr: number;
    StandardUnitOfMeasure: string;
    InactiveItem: 'Y' | 'N';
    ProductType: 'D' | 'F' | 'K' | 'R';
    BillType: string;
}

export interface SPSCustomerBillingAddress {
    CustomerName: string;
    AddressLine1: string | null;
    AddressLine2: string | null;
    AddressLine3: string | null;
    City: string;
    State: string;
    ZipCode: string;
    CountryCode: string;
}

export interface SPSShipToKey extends SPSCustomerKey {
    ShipToCode: string;
}

export interface SPSCustomerShipToAddress {
    ShipToCode: string;
    ShipToName: string;
    ShipToAddress1: string | null;
    ShipToAddress2: string | null;
    ShipToAddress3: string | null;
    ShipToCity: string;
    ShipToState: string;
    ShipToZipCode: string;
    ShipToCountryCode: string;
    WarehouseCode: string | null;
}


export interface SPSConversionResponse {
    SalesOrder: SPSSalesOrder;
    mapping: SPSValueMap[];
    customer: SPSCustomerMap | null;
    unitsOfMeasure: SPSItemUnit[];
    ItemCodes: (string | null)[];
    csvLines?: SPSOrderLine[];
}
