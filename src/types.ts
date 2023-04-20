export type Link = {
    name: string;
    href: string;
}

export type KYResult<T> = {
    object?: T;
    array?: T[];
    message?: string;
}

export type ACOption = {
    id: any;
    label: string;
};

export interface TableField {
    label: string;
    key: string | ((fn: any) => any);
    type: 'text' | 'money' | 'code' | 'date' | 'boolean' | 'tag'
}

export interface MDocument {
    _id: string;
    updatedAt: string;
    createdAt: string;
}


type DadataSuggestion<T> = {
	value: string
	unrestricted_value: string
	data: T
}

export type Address = DadataSuggestion<{
    postal_code?: string
    country?: string
    country_iso_code?: string
    federal_district?: string
    region_fias_id?: string
    region_kladr_id?: string
    region_iso_code?: string
    region_with_type?: string
    region_type?: string // сокращенный тип региона, например "обл"
    region_type_full?: string // полный тип региона, например "область"
    region?: string
    area_fias_id?: string
    area_kladr_id?: string
    area_with_type?: string
    area_type?: string // сокращенный тип района в регионе
    area_type_full?: string // полный тип района в регионе
    area?: string // район в регионе
    sub_area_fias_id?: string // ФИАС-код мун. поселения
    sub_area_kladr_id?: string // КЛАДР-код мун. поселения
    sub_area_with_type?: string // Мун. поселение с типом
    sub_area_type?: string // Тип мун. поселения (сокращенный)
    sub_area_type_full?: string // Тип мун. поселения
    sub_area?: string // Мун. поселение
    city_fias_id?: string // ФИАС-код города
    city_kladr_id?: string // КЛАДР-код города
    city_with_type?: string // Город с типом
    city_type?: string // Тип города (сокращенный)
    city_type_full?: string // Тип города
    city?: string // Город
    city_district_fias_id?: string // ФИАС-код адм. района города
    city_district_kladr_id?: string // не заполняется
    city_district_with_type?: string // Адм. район города с типом
    city_district_type?: string // Тип адм. района города (сокращенный)
    city_district_type_full?: string // Тип адм. района города
    city_district?: string // Адм. район города
    settlement_fias_id?: string // ФИАС-код нас. пункта
    settlement_kladr_id?: string // КЛАДР-код нас. пункта
    settlement_with_type?: string // Населенный пункт с типом
    settlement_type?: string // Тип населенного пункта (сокращенный)
    settlement_type_full?: string // Тип населенного пункта
    settlement?: string // Населенный пункт
    street_fias_id?: string // ФИАС-код улицы
    street_kladr_id?: string // КЛАДР-код улицы
    street_with_type?: string // Улица с типом
    street_type?: string // Тип улицы (сокращенный)
    street_type_full?: string // Тип улицы
    street?: string // Улица
    stead_fias_id?: string // ФИАС-код земельного участка
    stead_kladr_id?: string // КЛАДР-код земельного участка
    stead_type?: string // = «уч»
    stead_type_full?: string // = «участок»
    stead?: string // номер земельного участка
    house_fias_id?: string // ФИАС-код дома
    house_kladr_id?: string // КЛАДР-код дома
    house_type?: string // Тип дома (сокращенный)
    house_type_full?: string // Тип дома
    house?: string // Дом
    block_type?: string // Тип корпуса/строения (сокращенный)
    block_type_full?: string // Тип корпуса/строения
    block?: string // Корпус/строение
    entrance?: string // не заполняется
    floor?: string // не заполняется
    flat_fias_id?: string // ФИАС-код квартиры
    flat_type?: string // Тип квартиры (сокращенный)
    flat_type_full?: string // Тип квартиры
    flat?: string // Квартира
    room_fias_id?: string // ФИАС-код комнаты
    room_type?: string // Тип комнаты (сокращенный)
    room_type_full?: string // Тип комнаты
    room?: string // Комната
    postal_box?: string // Абонентский ящик
    fias_id?: string // ФИАС-код (он же код ГАР) адреса для России. Идентификатор OpenStreetMap для Белоруссии и Узбекистана. Для остальных стран — не заполняется.
    fias_level?: -1 | 0 | 1 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 65 | 75 // Уровень детализации, до которого адрес найден в ФИАС (ГАР):   0 — страна   1 — регион   3 — район   4 — город   5 — район города   6 — населенный пункт   7 — улица   8 — дом   9 — квартира или комната   65 — планировочная структура   75 — земельный участок   -1 — иностранный или пустой
    kladr_id?: string // КЛАДР-код
    geoname_id?: string // Идентификатор объекта в базе GeoNames. Для российских адресов не заполняется.
    capital_marker?: "0" | "1" | "2" | "3" | "4" // Признак центра района, города, населенного пункта:   0 — не центр   1 — центр района   2 — центр района субъекта РФ   3 — центр города   4 — центр субъекта РФ
    okato?: string // Код ОКАТО
    oktmo?: string // Код ОКТМО
    tax_office?: string // Код ИФНС
    tax_office_legal?: string // Код ИФНС для юридических лиц
    history_values: string[]
}>
